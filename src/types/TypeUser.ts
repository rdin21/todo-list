export type TAccessToken = {
  readonly access_token: string;
};

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export type TLoginUser = Pick<User, "email" | "password">;
export type TRegisterUser = Pick<
  User,
  "email" | "password" | "name" | "lastname"
>;
// export type TUserFromAccessToken = User & { iat: number; exp: string };
export type TUserFromAccessToken = Pick<
  User,
  "email" | "name" | "lastname" | "id"
> & {
  iat: number;
  exp: number;
};
