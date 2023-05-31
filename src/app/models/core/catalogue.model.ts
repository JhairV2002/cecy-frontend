export interface CatalogueModel {
  id?: number;
  parent?: CatalogueModel,
  name?: string;
  code?: string,
  description?: string,
  icon?: string,
  state?: string,
  type?: string,
  createdAt?: Date;
  updatedAt?: Date;
}

