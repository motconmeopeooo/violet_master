export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IAuth extends IToken {
  user: IUser | null;
}

export interface IToken {
  accessToken: string | null;
}
