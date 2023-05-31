import { CatalogueModel, RegistrationModel } from '@models/cecy';

export interface AdditionalInformationModel {
  id?: number;
  levelInstruction?: CatalogueModel;
  registration?: RegistrationModel;
  companyActivity?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyName?: string;
  companyPhone?: string;
  companySponsored?: boolean;
  contactName?: string;
  contactFollows?: [];
  courseKnow?: [];
  worked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RegistrationStudentModel extends AdditionalInformationModel {
  detailPlanificationId?: number;
}
