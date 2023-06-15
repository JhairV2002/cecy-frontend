import { User } from '@models/authentication';

export interface Notification {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  userId: number;
  createdAt: Date;
  user?: User;
}
