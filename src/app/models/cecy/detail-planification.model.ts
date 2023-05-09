import { CatalogueModel, ClassroomModel, RegistrationModel } from "@models/cecy";
import { PlanificationModel } from "@models/cecy/planification.model";
import { InstructorModel } from './instructor.model';

export interface DetailPlanificationModel {
  id?: number;
  classroom?: ClassroomModel;
  day?: CatalogueModel;
  parallel?: CatalogueModel;
  planification?: PlanificationModel;
  workday?: CatalogueModel;
  state?: CatalogueModel;
  endedTime?: Date;
  instructors?: InstructorModel[];
  observation?: string;
  planEndedAt?: Date;
  registrationLeft?: number;
  startedTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
