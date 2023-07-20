import {
  CatalogueModel,
  CourseModel,
  DetailSchoolPeriodModel,
} from '@models/cecy';
import { DetailPlanificationModel } from './detail-planification.model';

export interface PlanificationModel {
  id?: number;
  course?: CourseModel;
  detailPlanifications?: DetailPlanificationModel[];
  detailSchoolPeriod?: DetailSchoolPeriodModel;
  responsibleCourse?: any;
  responsibleCecy?: any;
  responsibleOcs?: any;
  state?: CatalogueModel;
  vicerector?: any;
  approvedAt?: Date;
  code?: string;
  endedAt?: Date;
  needs?: [];
  observation?: [];
  startedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
