import {SchoolPeriodModel} from "@models/cecy";

export interface DetailSchoolPeriodModel {
  id?: number;
  schoolPeriod?: SchoolPeriodModel;
  especialEndedAt?: Date;
  especialStartedAt?: Date;
  extraordinaryEndedAt?: Date;
  extraordinaryStartedAt?: Date;
  nullificationEndedAt?: Date;
  nullificationStartedAt?: Date;
  ordinaryEndedAt?: Date;
  ordinaryStartedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

}
