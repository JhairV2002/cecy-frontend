import { RegistrationModel, RequirementModel} from "@models/cecy";

export interface RegistrationRequirementModel {
  id?: number;
  registration:RegistrationModel;
  requirement:RequirementModel;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
