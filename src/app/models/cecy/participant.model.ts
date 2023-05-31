import { UserModel } from '@models/core';
import { CatalogueModel } from '@models/cecy'

export interface ParticipantModel {
  id?: number;
  state?: CatalogueModel;
  type?: CatalogueModel;
  user?: UserModel;
  createdAt?: Date;
  updatedAt?: Date;
}
