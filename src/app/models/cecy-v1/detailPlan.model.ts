import { ClassroomModel } from './classroom.model';

import { CatalogueModel } from '@models/cecy';

export interface DetailPlanModel {
  id: number;
  planificationId: number;
  classroom: ClassroomModel;
  day: CatalogueModel;
  parallel: CatalogueModel;
  // planification:number;
  workday: CatalogueModel;
  endedTime: Date;
  observation: string;
  startedTime: Date;
  classroomId: number;
  dayId: number;
  parallelId: number;
  workdayId: number;
  schedule: string;
  stateId: number;
}
