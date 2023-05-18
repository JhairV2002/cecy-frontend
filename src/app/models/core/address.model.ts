import { CatalogueModel, LocationModel } from '@models/core';

export interface AddressModel {
    id?: number;
    sector?: CatalogueModel;
    location?: LocationModel;
    mainStreet?: string;
    secondaryStreet?: string;
    number?: string;
    postCode?: string;
    reference?: string;
    latitude?: number;
    longitude?: number;
}
