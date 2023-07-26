import { Catalogue } from './catalogue';
import { Courses } from './courses';

/* export interface Inscription {
  id: number;
  userId: number;
  courseId: number;
  publicity: Catalogue;
  otherCourses: string;
  sponsoredCourse: boolean;
  institutionContact: string;
  state: Catalogue;
} */

export interface Inscription {
  id: number;
  sponsoredCourse: boolean;
  institutionContact: string;
  otherCourses: string;
  state: Catalogue | null;
  publicity: Catalogue | null;
  documents: any | null;
}
