export interface User {
  id: number;
  email: string;
  password: string;
}

export interface RecoveryUserDTO extends Omit<User, 'id' | 'password'> {}
