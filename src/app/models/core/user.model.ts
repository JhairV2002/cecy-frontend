import { LocationModel, CatalogueModel, AddressModel, ImageModel } from '@models/core';

export interface UserModel {
  id?: number;
  email?: string;
  lastname?: string;
  //identificationType?: CatalogueModel;
  name?: string;
  phone?: string;
  username?: string;
  //nationality?: LocationModel;
  //address?: AddressModel;
  //disability?: CatalogueModel;
  //sex?: CatalogueModel;
  //gender?: CatalogueModel;
  //ethnicOrigin?: CatalogueModel;
  //bloodType?: CatalogueModel;
  //civilStatus?: CatalogueModel;
  phones?: CatalogueModel[];
  //emails?: CatalogueModel[];
  //images?: ImageModel[];
  //avatar?: string;
  //birthdate?: string;
}
