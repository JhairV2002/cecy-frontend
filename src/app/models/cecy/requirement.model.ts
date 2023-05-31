import { CatalogueModel,PivotRequirementModel } from "@models/cecy";

export interface RequirementModel {
  id?: number;
  state?: CatalogueModel;
  name?: string;
  pivot?:PivotRequirementModel;
  required?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
