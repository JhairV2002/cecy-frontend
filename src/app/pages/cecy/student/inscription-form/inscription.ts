import { Catalogue } from "./cmb-publicity/catalogue";

export interface Inscription {
  id: number;
  userId: number;
  courseId: number;
  publicity: Catalogue;
  otherCourses: number;
  sponsoredCourse: boolean;
  institutionContact: string;
  state: Catalogue;
  personCecy: number;
}
