import { CatalogueModel } from "@models/cecy";

export interface ClassroomModel {
  id?: number;
  type?: CatalogueModel;
  capacity?: number;
  code?: string;
  description?: string;
  name?: string;
  createdAt?: Date; 
  updatedAt?: Date;
}
