import { AuthorityModel, CatalogueModel, CourseModel, DetailSchoolPeriodModel, InstructorModel } from "@models/cecy";
import { DetailPlanificationModel } from './detail-planification.model';

export interface PlanificationModel {
  id?: number;
  course?: CourseModel;
  detailPlanifications?: DetailPlanificationModel[];
  detailSchoolPeriod?: DetailSchoolPeriodModel;
  responsibleCourse?: InstructorModel;
  responsibleCecy?: AuthorityModel;
  responsibleOcs?: AuthorityModel;
  state?: CatalogueModel;
  vicerector?: AuthorityModel;
  approvedAt?: Date;
  code?: string;
  endedAt?: Date;
  needs?: [];
  observation?: [];
  startedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
