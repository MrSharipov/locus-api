import { UserRoleEnum } from '../../users';

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRoleEnum;
}
