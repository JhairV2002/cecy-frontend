import { CatalogueModel } from "@models/cecy";

export interface SchoolPeriodModel {
  id?: number;
  name?: string;
  code?: string;
  state?: CatalogueModel;
  minimumNote?: number;
  startedAt?: Date;
  createdAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
}
