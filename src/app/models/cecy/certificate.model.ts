import { CatalogueModel } from "@models/cecy";

export interface CertificateModel {
  id?: number;
  state?: CatalogueModel;
  certificateable_id?: number;
  code?: string;
  certificateable_type?: string;
  issuedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
