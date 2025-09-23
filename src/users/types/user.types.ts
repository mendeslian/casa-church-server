export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}
