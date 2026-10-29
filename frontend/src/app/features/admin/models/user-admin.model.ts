export type UserRole = 'USER' | 'ADMIN';

export interface UserAdmin {
  id: string;
  username: string;
  displayName: string | null;
  email: string | null;
  country: string | null;
  avatar: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserAdminRequest {
  username: string;
  password: string;
  displayName?: string;
  email?: string;
  country?: string;
  avatar?: string;
}

export interface UpdateUserAdminRequest {
  username?: string;
  displayName?: string | null;
  email?: string | null;
  country?: string | null;
  avatar?: string | null;
}

export interface ArchiveUserAdminResponse {
  id: string;
  deletedAt: string;
}