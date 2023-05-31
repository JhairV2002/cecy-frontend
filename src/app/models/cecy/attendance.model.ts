export interface AttendanceModel {
  id?: number;
  duration?: number;
  registeredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DetailModel extends AttendanceModel {
  detailPlanificationId: number;
}
