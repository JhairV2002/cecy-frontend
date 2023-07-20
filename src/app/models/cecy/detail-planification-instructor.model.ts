import {DetailPlanificationModel, TopicModel} from "@models/cecy";

export interface DetailPlanificationInstructorModel {
  id?: number;
  detailPlanification?: DetailPlanificationModel;
  instructor?: any;
  topic?: TopicModel;
  createdAt?: Date;
  updatedAt?: Date;
}
