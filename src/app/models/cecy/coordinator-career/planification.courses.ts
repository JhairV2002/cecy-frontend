export interface PlanificationCourses {
  id?: number;
  lectiveYear?: string;
  codeCourse?: string;
  name?: string;
  durationTime?: number;
  startDate?: Date;
  finishDate?: Date;
  state?: string;
  careerId?: number;
  roleId: number
  customerId: Customer
}


export interface Customer {
  id: number;
  name: string;
}
