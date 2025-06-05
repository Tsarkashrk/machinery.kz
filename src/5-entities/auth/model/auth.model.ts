export interface IAuth {
  access: string;
  refresh: string;
}

export interface IAuthLoginRequest {
  email: string;
  password: string;
  confirm_password?: string;
}

export interface IAuthRegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password?: string;
}
