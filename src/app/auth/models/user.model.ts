export interface User {
  _id?: string;
  name: string;
  login: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
  isLoadingLogin: boolean;
  hasLoginError: boolean;
}
