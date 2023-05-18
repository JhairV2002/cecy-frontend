export interface CatalogueModel {
  id?: number;
  parent?: CatalogueModel,
  children?: CatalogueModel[];
  name?: string;
  code?: string,
  description?: string,
  icon?: string,
  type?: string,
  createdAt?: Date;
  updatedAt?: Date;
}

