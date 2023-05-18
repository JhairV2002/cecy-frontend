import {DetailPlanificationModel, TopicModel,InstructorModel} from "@models/cecy";

export interface DetailPlanificationInstructorModel {
  id?: number;
  detailPlanification?: DetailPlanificationModel;
  instructor?: InstructorModel;
  topic?: TopicModel;
  createdAt?: Date;
  updatedAt?: Date;
}
