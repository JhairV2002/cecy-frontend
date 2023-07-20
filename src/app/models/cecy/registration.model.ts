import { CatalogueModel, DetailPlanificationModel } from '@models/cecy';
import { AdditionalInformationModel } from './additional-information.model';

export interface RegistrationModel {
  id?: number;
  detailPlanification?: DetailPlanificationModel;
  aditionalInformation?: AdditionalInformationModel;
  requirements?: any[];
  participant?: any;
  state?: CatalogueModel;
  type?: CatalogueModel;
  typeParticipant?: CatalogueModel;
  stateCourse?: CatalogueModel;
  finalGrade?: number;
  grade1?: number;
  grade2?: number;
  number?: number;
  registeredAt?: Date;
  observations?: Date;
  createdAt?: Date;
  updatedAt?: Date;

}
