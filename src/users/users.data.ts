export enum UserRoleEnum {
  ADMIN = 'admin',
  NORMAL = 'normal',
  LIMITED = 'limited',
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRoleEnum;
}

// In-memory user data for demonstration purposes
export const users: User[] = [
  {
    id: 1,
    username: 'john',
    password: 'admin123',
    role: UserRoleEnum.ADMIN,
  },
  {
    id: 2,
    username: 'sarah',
    password: 'normal123',
    role: UserRoleEnum.NORMAL,
  },
  {
    id: 3,
    username: 'anna',
    password: 'limited123',
    role: UserRoleEnum.LIMITED,
  },
];

// Mock function to get user by role for testing purposes
export const getUserByRole = (role: UserRoleEnum): User => {
  const user = users.find((user) => user.role === role);
  if (!user) {
    throw new Error(`User with role ${role} not found`);
  }
  return user;
};
