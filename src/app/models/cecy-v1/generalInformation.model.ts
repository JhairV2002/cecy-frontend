import { CareerModel } from './career.model';

import { CatalogueModel } from '@models/cecy';
export class GeneralInformation {
  idId?: number;
  abbreviation?: string;
  categoryId?: number;
  certifiedTypeId?: number;
  courseTypeId?: number;
  entityCertificationId?: number;
  formationTypeId?: number;
  modalityId?: number;
  duration?: number;
  needs?: string[];
  participantTypes?: string[];
  project?: string;
  summary?: string;
  targetGroups?: string[];

  category?: CatalogueModel;
  certifiedType?: CatalogueModel;
  courseType?: CatalogueModel;
  entityCertification?: CatalogueModel;
  formationType?: CatalogueModel;
  modality?: CatalogueModel;
  career?: CareerModel;

}
