import {ImageModel} from "@models/core";

export interface PhotographicRecordModel {
  id?: number;
  description?: string;
  image?: ImageModel[];
  numberWeek?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RecordModel extends PhotographicRecordModel {
  detailPlanificationId: number;
}
