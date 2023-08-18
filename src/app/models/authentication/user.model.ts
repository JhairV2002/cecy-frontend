import { Role } from '@models/cecy/coordinator-cecy/career-planification.model';

export interface User {
  id?: number;
  names?: string;
  lastnames?: string;
  phone?: string;
  email?: string;
  identityCard?: string;
  recoveryToken?: string;
  image?: string;
  password?: string;
  roleId?: number;
  createdAt?: Date;
  updateAt?: Date;
  gender?: string;
  role?: Role;
}

export interface RecoveryUserDTO extends Omit<User, 'id' | 'password'> {}
