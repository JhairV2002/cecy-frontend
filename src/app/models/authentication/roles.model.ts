export interface Roles {
  id: number;
  name: string;
  description: string
}

export interface CreateRoleDTO extends Omit<Roles, 'id'> {}

export interface SelecRoleDTO extends Omit<Roles, 'id'>{}
