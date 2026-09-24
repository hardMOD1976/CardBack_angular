

export interface LoginResponse {

  accessToken: string;

  refreshToken: string;

  user?: {
    id: string;
    username: string;
    displayName?: string | null;
    email?: string | null;
    role: string;
  };

}
