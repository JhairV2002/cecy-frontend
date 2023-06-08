export interface PlanificationCourses {
  id?: number;
  schoolYearId: number;
  codeCourse?: string;
  name?: string;
  durationTime?: number;
  startDate?: Date;
  finishDate?: Date;
  state?: string;
  free: Boolean;
  modalityId?: number;
  careerId?: number;
  roleId: number;
  userId: number;
  createdAt: Date;
}
