import {
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import {
  ArchiveUserAdminResponse,
  CreateUserAdminRequest,
  UpdateUserAdminRequest,
  UserAdmin,
} from '../../models/user-admin.model';
import { UserAdminService } from '../../services/user-admin.service';

type UserFormMode = 'create' | 'edit';

interface UserFormValue {
  username: string;
  displayName: string;
  email: string;
  password: string;
  country: string;
  avatar: string;
}

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './users-admin.html',
  styleUrl: './users-admin.scss',
})
export class UsersAdmin implements OnInit {
  private readonly userAdminService = inject(UserAdminService);

  readonly users = signal<UserAdmin[]>([]);
  readonly searchTerm = signal('');
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly isFormOpen = signal(false);
  readonly formMode = signal<UserFormMode>('create');
  readonly editingUserId = signal<string | null>(null);
  readonly userToArchive = signal<UserAdmin | null>(null);

  readonly formValue = signal<UserFormValue>(
    this.createEmptyForm(),
  );

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();

    if (!term) {
      return this.users();
    }

    return this.users().filter((user) => {
      const searchableValues = [
        user.username,
        user.displayName,
        user.email,
        user.country,
        user.role,
      ];

      return searchableValues.some((value) =>
        value?.toLocaleLowerCase().includes(term),
      );
    });
  });

  readonly totalUsers = computed(() => this.users().length);

  readonly totalRegularUsers = computed(
    () => this.users().filter((user) => user.role === 'USER').length,
  );

  readonly totalAdministrators = computed(
    () => this.users().filter((user) => user.role === 'ADMIN').length,
  );

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.userAdminService
      .getUsers()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (users) => {
          this.users.set(users);
        },
        error: () => {
          this.errorMessage.set(
            'Unable to load users. Please try again.',
          );
        },
      });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  openCreateForm(): void {
    this.resetMessages();
    this.formMode.set('create');
    this.editingUserId.set(null);
    this.formValue.set(this.createEmptyForm());
    this.isFormOpen.set(true);
  }

  openEditForm(user: UserAdmin): void {
    this.resetMessages();
    this.formMode.set('edit');
    this.editingUserId.set(user.id);

    this.formValue.set({
      username: user.username,
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      password: '',
      country: user.country ?? '',
      avatar: user.avatar ?? '',
    });

    this.isFormOpen.set(true);
  }

  closeForm(): void {
    if (this.isSaving()) {
      return;
    }

    this.isFormOpen.set(false);
    this.editingUserId.set(null);
    this.formValue.set(this.createEmptyForm());
  }

  updateFormField(
    field: keyof UserFormValue,
    value: string,
  ): void {
    this.formValue.update((form) => ({
      ...form,
      [field]: value,
    }));
  }

  saveUser(): void {
    if (this.isSaving()) {
      return;
    }

    const form = this.formValue();
    const username = form.username.trim();
    const displayName = form.displayName.trim();
    const email = form.email.trim();
    const country = form.country.trim();
    const avatar = form.avatar.trim();

    if (!username) {
      this.errorMessage.set('Username is required.');
      return;
    }

    if (!/^[A-Za-z0-9._-]{3,24}$/.test(username)) {
      this.errorMessage.set(
        'Username must contain 3–24 characters: letters, numbers, dots, underscores or hyphens.',
      );
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errorMessage.set('Enter a valid email address.');
      return;
    }

    this.resetMessages();
    this.isSaving.set(true);

    if (this.formMode() === 'create') {
      const password = form.password;

      if (password.length < 12 || password.length > 128) {
        this.isSaving.set(false);
        this.errorMessage.set(
          'Password must contain between 12 and 128 characters.',
        );
        return;
      }

      const payload: CreateUserAdminRequest = {
        username,
        password,
        ...(displayName ? { displayName } : {}),
        ...(email ? { email } : {}),
        ...(country ? { country } : {}),
        ...(avatar ? { avatar } : {}),
      };

      this.userAdminService
        .createUser(payload)
        .pipe(finalize(() => this.isSaving.set(false)))
        .subscribe({
          next: () => {
            this.isFormOpen.set(false);
            this.formValue.set(this.createEmptyForm());
            this.successMessage.set('User created successfully.');
            this.loadUsers();
          },
          error: (error: { error?: { message?: string | string[] } }) => {
            this.errorMessage.set(
              this.getApiErrorMessage(
                error,
                'Unable to create the user.',
              ),
            );
          },
        });

      return;
    }

    const userId = this.editingUserId();

    if (!userId) {
      this.isSaving.set(false);
      this.errorMessage.set('Unable to identify the user to update.');
      return;
    }

    const payload: UpdateUserAdminRequest = {
      username,
      displayName: displayName || null,
      email: email || null,
      country: country || null,
      avatar: avatar || null,
    };

    this.userAdminService
      .updateUser(userId, payload)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => {
          this.isFormOpen.set(false);
          this.editingUserId.set(null);
          this.formValue.set(this.createEmptyForm());
          this.successMessage.set('User updated successfully.');
          this.loadUsers();
        },
        error: (error: { error?: { message?: string | string[] } }) => {
          this.errorMessage.set(
            this.getApiErrorMessage(
              error,
              'Unable to update the user.',
            ),
          );
        },
      });
  }

  requestArchive(user: UserAdmin): void {
    if (user.role === 'ADMIN') {
      return;
    }

    this.resetMessages();
    this.userToArchive.set(user);
  }

  cancelArchive(): void {
    this.userToArchive.set(null);
  }

  confirmArchive(): void {
    const user = this.userToArchive();

    if (!user || user.role === 'ADMIN') {
      return;
    }

    this.userToArchive.set(null);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isSaving.set(true);

    this.userAdminService
      .archiveUser(user.id)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: (_response: ArchiveUserAdminResponse) => {
          this.users.update((users) =>
            users.filter((item) => item.id !== user.id),
          );

          this.successMessage.set(
            `User "${user.username}" archived successfully.`,
          );
        },
        error: (error: { error?: { message?: string | string[] } }) => {
          this.errorMessage.set(
            this.getApiErrorMessage(
              error,
              'Unable to archive the user.',
            ),
          );
        },
      });
  }

  trackByUserId(_index: number, user: UserAdmin): string {
    return user.id;
  }

  private createEmptyForm(): UserFormValue {
    return {
      username: '',
      displayName: '',
      email: '',
      password: '',
      country: '',
      avatar: '',
    };
  }

  private resetMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  private getApiErrorMessage(
    error: { error?: { message?: string | string[] } },
    fallback: string,
  ): string {
    const message = error.error?.message;

    if (Array.isArray(message)) {
      return message.join(' ');
    }

    return message || fallback;
  }
}
