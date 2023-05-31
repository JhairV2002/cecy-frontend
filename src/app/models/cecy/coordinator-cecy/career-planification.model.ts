export interface PlanificationCoursesCoordinatorCecy {
  id?: number;
  codeCourse?: string;
  name?: string;
  durationTime?: number;
  startDate?: Date;
  finishDate?: Date;
  state?: string;
  teacherId: Teachers;
  careerId: Career;
  roleId: Role;
}

export interface Career {
  id: number;
  name: string;
}

export interface Teachers {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}
