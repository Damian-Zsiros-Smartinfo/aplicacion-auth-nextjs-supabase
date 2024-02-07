export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserWithId extends User {
  id: string;
}

export type UserLoginInfo = Partial<User>;
