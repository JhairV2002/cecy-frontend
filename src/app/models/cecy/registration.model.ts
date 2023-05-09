import { CatalogueModel, DetailPlanificationModel, ParticipantModel } from '@models/cecy';
import { UserModel } from '@models/core';
import { AdditionalInformationModel } from './additional-information.model';

export interface RegistrationModel {
  id?: number;
  detailPlanification?: DetailPlanificationModel;
  aditionalInformation?: AdditionalInformationModel;
  requirements?: any[];
  participant?: ParticipantModel;
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
  user?: UserModel;
  createdAt?: Date;
  updatedAt?: Date;

}
