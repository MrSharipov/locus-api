import { UserRole } from "../../users";

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRole;
}