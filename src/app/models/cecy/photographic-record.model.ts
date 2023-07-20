
export interface PhotographicRecordModel {
  id?: number;
  description?: string;
  image?: any;
  numberWeek?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RecordModel extends PhotographicRecordModel {
  detailPlanificationId?: number;
}
