import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../../../core/auth/token.service';
import { ThemeService } from '../../../../core/services/theme.service';

type AuthScreen = 'login' | 'register' | 'forgot' | 'reset';
type AuthOperationResult = {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly tokens = inject(TokenService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  readonly theme = inject(ThemeService);
  readonly screen = signal<AuthScreen>('login');
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly passwordRecoveryEnabled = signal(false);

  readonly form = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._-]{3,24}$/)]],
    displayName: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    // Existing accounts may have passwords shorter than the new-account policy.
    // Apply the 12-character minimum only in register/reset flows below.
    password: ['', Validators.required],
    currentPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    rememberMe: [true],
    token: ['', Validators.required],
  });

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.form.controls.token.setValue(token);
        this.setScreen('reset');
      }
    });
    this.auth.configuration().subscribe({
      next: (config) => this.passwordRecoveryEnabled.set(config.passwordRecoveryEnabled),
    });
  }

  setScreen(screen: AuthScreen): void {
    this.screen.set(screen);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.form.controls.password.reset('');
    this.form.controls.confirmPassword.reset('');
    this.form.controls.currentPassword.reset('');
  }

  submit(): void {
    const screen = this.screen();
    this.errorMessage.set('');
    this.successMessage.set('');
    if (!this.isValidFor(screen)) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const values = this.form.getRawValue();
    const request: Observable<AuthOperationResult> = screen === 'login'
      ? this.auth.login({ identifier: values.identifier, password: values.password })
      : screen === 'register'
        ? this.auth.register({ username: values.username, displayName: values.displayName, email: values.email, password: values.password })
        : screen === 'forgot'
          ? this.auth.forgotPassword({ email: values.email })
          : this.auth.resetPassword({ token: values.token, password: values.password });

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        this.loading.set(false);
        if (result.accessToken && result.refreshToken) {
          this.tokens.setRemembered(values.rememberMe);
          this.tokens.setAccessToken(result.accessToken);
          this.tokens.setRefreshToken(result.refreshToken);
          void this.router.navigateByUrl('/dashboard');
        } else if (screen === 'reset') {
          this.successMessage.set(result.message || 'Password updated. Sign in with your new password.');
          this.setScreen('login');
          this.successMessage.set(result.message || 'Password updated. Sign in with your new password.');
        } else {
          this.successMessage.set(result.message || 'If the account exists, instructions have been sent.');
          if (screen === 'forgot') this.form.controls.email.reset('');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(error.error?.message || error.error?.error || 'We could not complete that request. Please try again.');
      },
    });
  }

  private isValidFor(screen: AuthScreen): boolean {
    const controls = this.form.controls;
    if (screen === 'login') return controls.identifier.valid && controls.password.valid;
    if (screen === 'register') {
      if (controls.password.value !== controls.confirmPassword.value) {
        this.errorMessage.set('The passwords do not match.');
        return false;
      }
      if (controls.password.value.length < 12 || controls.password.value.length > 128) {
        this.errorMessage.set('Use a password between 12 and 128 characters.');
        return false;
      }
      return controls.username.valid && controls.displayName.valid && controls.email.valid && controls.password.valid;
    }
    if (screen === 'forgot') return controls.email.valid;
    if (controls.password.value !== controls.confirmPassword.value) {
      this.errorMessage.set('The passwords do not match.');
      return false;
    }
    if (controls.password.value.length < 12 || controls.password.value.length > 128) {
      this.errorMessage.set('Use a password between 12 and 128 characters.');
      return false;
    }
    return controls.token.valid && controls.password.valid;
  }
}
