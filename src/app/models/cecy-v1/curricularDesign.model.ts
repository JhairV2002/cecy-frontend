import { CatalogueModel } from '@models/cecy';

export class CurricularDesign {
  id?: number;
  alignment?: string;
  areaId?: number
  area?: CatalogueModel;
  bibliographies?: string[];
  evaluationMechanisms?: string[];
  learningEnvironments?: string[];
  objective?: string;
  practiceHours?: number;
  specialityId?: number;
  speciality?: CatalogueModel;
  teachingStrategies?: string[];
  techniquesRequisites?: string[];
  theoryHours?: number;
  prerequisites?: string[];
}
