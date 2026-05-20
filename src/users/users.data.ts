export type UserRole =
  | 'admin'
  | 'normal'
  | 'limited';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

// In-memory user data for demonstration purposes
export const users: User[] = [
  {
    id: 1,
    username: 'john',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 2,
    username: 'sarah',
    password: 'normal123',
    role: 'normal',
  },
  {
    id: 3,
    username: 'anna',
    password: 'limited123',
    role: 'limited',
  },
];