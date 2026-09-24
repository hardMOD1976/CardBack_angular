import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.usersService.findByIdentifier(identifier.trim());
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.identifier, dto.password);
    return { ...(await this.issueTokens(user)), user: this.publicUser(user) };
  }

  async register(dto: RegisterDto) {
    const username = dto.username.trim();
    const email = dto.email.trim().toLowerCase();
    if (await this.usersService.findByIdentifier(username) || await this.usersService.findByEmail(email)) {
      throw new ConflictException('An account with this username or email already exists.');
    }
    try {
      const user = await this.usersService.createAccount({
        username,
        email,
        displayName: dto.displayName.trim(),
        passwordHash: await bcrypt.hash(dto.password, 12),
      });
      return { ...(await this.issueTokens(user)), user: this.publicUser(user) };
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('An account with this username or email already exists.');
      }
      throw error;
    }
  }

  passwordRecoveryEnabled(): boolean {
    return Boolean(
      this.configService.get<string>('RESEND_API_KEY') &&
      this.configService.get<string>('RESEND_FROM_EMAIL') &&
      this.configService.get<string>('APP_BASE_URL'),
    );
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    if (!this.passwordRecoveryEnabled()) {
      throw new ServiceUnavailableException('Password recovery is not configured. Contact the application administrator.');
    }
    const user = await this.usersService.findByEmail(dto.email.trim().toLowerCase());
    if (!user) return { message: 'If an account exists for that email, a password reset link has been sent.' };

    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    await this.prisma.$transaction([
      this.prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
      this.prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + 30 * 60 * 1000) },
      }),
    ]);

    const baseUrl = this.configService.getOrThrow<string>('APP_BASE_URL').replace(/\/$/, '');
    const resetUrl = `${baseUrl}/login?token=${token}`;
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.configService.getOrThrow<string>('RESEND_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.configService.getOrThrow<string>('RESEND_FROM_EMAIL'),
          to: [user.email],
          subject: 'Reset your Cardback password',
          html: `<p>Hello ${this.escapeHtml(user.displayName || user.username)},</p><p>Use this one-time link to reset your Cardback password. It expires in 30 minutes.</p><p><a href="${resetUrl}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`,
        }),
      });
      if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
    } catch {
      await this.prisma.passwordResetToken.deleteMany({ where: { tokenHash } });
      throw new ServiceUnavailableException('The recovery email could not be sent. Try again later.');
    }
    return { message: 'If an account exists for that email, a password reset link has been sent.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');
    const token = await this.prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!token || token.usedAt || token.expiresAt <= new Date()) {
      throw new BadRequestException('This password reset link is invalid or has expired.');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const updated = await this.prisma.$transaction(async (tx) => {
      const claim = await tx.passwordResetToken.updateMany({
        where: { id: token.id, usedAt: null, expiresAt: { gt: new Date() } },
        data: { usedAt: new Date() },
      });
      if (!claim.count) return false;
      await tx.user.update({ where: { id: token.userId }, data: { passwordHash, refreshTokenHash: null } });
      await tx.passwordResetToken.deleteMany({ where: { userId: token.userId } });
      return true;
    });
    if (!updated) throw new BadRequestException('This password reset link is invalid or has expired.');
    return { message: 'Your password has been changed. Please sign in again.' };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.usersService.findOne(userId);
    if (!user || !(await bcrypt.compare(dto.currentPassword, user.passwordHash))) {
      throw new UnauthorizedException('The current password is incorrect.');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('Choose a password different from your current one.');
    }
    await this.usersService.updatePassword(userId, await bcrypt.hash(dto.newPassword, 12));
    return { message: 'Password changed. Sign in again on your devices.' };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.usersService.findOne(payload.sub);
      if (!user?.refreshTokenHash || !(await bcrypt.compare(refreshToken, user.refreshTokenHash))) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return { ...(await this.issueTokens(user)) };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }

  private async issueTokens(user: { id: string; username: string; role: string }) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN') as StringValue,
    });
    await this.usersService.updateRefreshToken(user.id, await bcrypt.hash(refreshToken, 10));
    return { accessToken, refreshToken };
  }

  private publicUser(user: { id: string; username: string; displayName?: string | null; email?: string | null; role: string }) {
    return { id: user.id, username: user.username, displayName: user.displayName, email: user.email, role: user.role };
  }

  private escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
  }
}
