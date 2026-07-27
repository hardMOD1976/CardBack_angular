import { CurrentUser } from './current-user.model';

export interface LoginResponse {

  accessToken: string;

  user: CurrentUser;

}