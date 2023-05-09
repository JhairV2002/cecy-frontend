import { CatalogueModel } from "@models/cecy";
import { RegistrationModel } from "@models/cecy";
import { AttendanceModel } from "@models/cecy";

export interface DetailAttendanceModel {
  id?: number;
  attendance?: AttendanceModel;
  registration?: RegistrationModel;
  type?: CatalogueModel;
  createdAt?: Date;
  updatedAt?: Date;
}
