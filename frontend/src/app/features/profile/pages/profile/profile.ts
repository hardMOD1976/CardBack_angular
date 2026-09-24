import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
import { TokenService } from '../../../../core/auth/token.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly auth = inject(AuthService);
  private readonly tokens = inject(TokenService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly saving = signal(false);
  readonly message = signal('');
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(128)]],
    confirmPassword: ['', Validators.required],
  });

  changePassword(): void {
    this.message.set('');
    this.error.set('');
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { currentPassword, newPassword, confirmPassword } = this.form.getRawValue();
    if (newPassword !== confirmPassword) { this.error.set('The new passwords do not match.'); return; }
    this.saving.set(true);
    this.auth.changePassword({ currentPassword, newPassword }).subscribe({
      next: (result) => { this.message.set(result.message); this.form.reset(); this.tokens.clear(); void this.router.navigateByUrl('/welcome'); },
      error: (failure: HttpErrorResponse) => { this.error.set(failure.error?.message || 'Could not change the password.'); this.saving.set(false); },
    });
  }

  logout(): void {
    this.auth.logout().subscribe({ complete: () => void this.router.navigateByUrl('/welcome'), error: () => { this.tokens.clear(); void this.router.navigateByUrl('/welcome'); } });
  }
}
