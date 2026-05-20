import { UserRole } from "../../users/users.data";

export interface RequestUser {
  userId: number;
  username: string;
  role: UserRole;
}