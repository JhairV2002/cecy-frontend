export interface Customer {
  id: number;
  name?: string;
  lastname: string;
  phone: string;
  role?: string;
  email?: string
  customer?: {
    name: string,
    lastname: string
  },
  user: {
    email: string;
    password: string;
    role: string;
  };
}

export interface CreateCustomerDTO extends Omit<Customer, 'id'> {}

export interface ProfileCustomerDTO extends Omit<Customer, 'id' | 'password'> {}
