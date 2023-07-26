import {
  CatalogueModel,
  ClassroomModel,
  RegistrationModel,
} from '@models/cecy';
export interface DetailPlanificationModel {
  id?: number;
  classroom?: ClassroomModel;
  day?: CatalogueModel;
  parallel?: CatalogueModel;
  planification?: any;
  workday?: CatalogueModel;
  state?: CatalogueModel;
  endedTime?: Date;
  instructors?: [];
  observation?: string;
  planEndedAt?: Date;
  registrationLeft?: number;
  startedTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
