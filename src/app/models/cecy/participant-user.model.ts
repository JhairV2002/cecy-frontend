import { LocationModel, CatalogueModel, AddressModel, UserModel } from '@models/core';

export interface ParticipantUserModel {
  user?: UserModel;
  participantType?: CatalogueModel;
}
