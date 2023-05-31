import { UserModel } from '@models/core';
import { InstitutionModel, CatalogueModel } from '@models/cecy';

export interface AuthorityModel {
  id?: number;
  institution?: InstitutionModel;
  position?: CatalogueModel;
  state?: CatalogueModel;
  user?: UserModel;
  positionStartedAt?: Date;
  positionEndedAt?: Date;
  electronicSignature?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
