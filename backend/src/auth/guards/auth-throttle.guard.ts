import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

type Bucket = { startedAt: number; count: number };

@Injectable()
export class AuthThrottleGuard implements CanActivate {
  private readonly buckets = new Map<string, Bucket>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const route = String(request.originalUrl || request.url || '').split('?')[0];
    const ip = request.ip || request.socket?.remoteAddress || 'unknown';
    const policy = this.policy(route);
    if (!policy) return true;

    const key = `${ip}:${route}`;
    const now = Date.now();
    let bucket = this.buckets.get(key);
    if (!bucket || now - bucket.startedAt >= policy.windowMs) {
      bucket = { startedAt: now, count: 0 };
      this.buckets.set(key, bucket);
    }
    bucket.count += 1;
    if (this.buckets.size > 5000) {
      for (const [candidate, entry] of this.buckets) {
        if (now - entry.startedAt > policy.windowMs) this.buckets.delete(candidate);
      }
    }
    if (bucket.count > policy.limit) throw new HttpException('Too many attempts. Please wait and try again.', HttpStatus.TOO_MANY_REQUESTS);
    return true;
  }

  private policy(path: string): { limit: number; windowMs: number } | null {
    const fifteenMinutes = 15 * 60 * 1000;
    if (path.endsWith('/auth/login')) return { limit: 10, windowMs: fifteenMinutes };
    if (path.endsWith('/auth/register')) return { limit: 4, windowMs: 60 * 60 * 1000 };
    if (path.endsWith('/auth/password/forgot')) return { limit: 3, windowMs: fifteenMinutes };
    if (path.endsWith('/auth/password/reset')) return { limit: 5, windowMs: fifteenMinutes };
    if (path.endsWith('/auth/password/change')) return { limit: 5, windowMs: fifteenMinutes };
    if (path.endsWith('/ai/identify-figure')) return { limit: 8, windowMs: 60 * 60 * 1000 };
    return null;
  }
}
