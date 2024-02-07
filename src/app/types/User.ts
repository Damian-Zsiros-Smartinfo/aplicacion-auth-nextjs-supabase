export interface UserWithoutId {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface User extends UserWithoutId {
  id?: string;
}

export type UserVerify = Partial<User>;

export interface OTP extends UserVerify {
  code: string;
}
