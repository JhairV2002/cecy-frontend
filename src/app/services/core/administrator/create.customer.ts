export interface CreateCustomer {
  id?: number;
  name?: string;
  lastname?: string;
  phone?: string;
  user?: {
    email?: string;
    password?: string;
    role?: string;
  };
}
