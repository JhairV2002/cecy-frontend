import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';
import { CareerModel } from '@models/cecy-v1/career.model';
import { CatalogueModel } from '@models/core';
import { Course, CourseModel } from '@models/cecy-v1/course.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { GeneralInformation } from '@models/cecy-v1/generalInformation.model';
import { CurricularDesign } from '@models/cecy-v1/curricularDesign.model';
import { ClassroomModel } from '@models/cecy-v1/classroom.model';
import { Topic } from '@models/cecy-v1/topic.model';
import { environment } from '@env/environment';
import { Sponsor } from '@models/cecy-v1/sponsor.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `${environment.api2}/courses`;
  private apiUrlUser = `${environment.api2}/users`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  // course crud

  getCourseById(id: number) {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  public save(course: any) {
    return this.http.post<CourseModel>(`${this.apiUrl}`, course);
  }

  public update(course: any, id: any): Observable<any> {
    this.loading.next(true);
    return this.http.put<any>(this.apiUrl + '/' + id, course).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  public findAll(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(this.apiUrl + '/');
  }

  public deleteById(id: number): Observable<CourseModel> {
    return this.http.delete<CourseModel>(this.apiUrl + '/' + id);
  }

  public getCourse(id: number): Observable<CourseModel> {
    return this.http.get<CourseModel>(this.apiUrl + '/' + id);
  }

  public findByCode(code: CourseModel): Observable<CourseModel> {
    return this.http.get<CourseModel>(this.apiUrl + '/code/' + code);
  }

  // catalogue course get

  public getCatalogues(name: string): Observable<CatalogueModel[]> {
    return this.http.get<CatalogueModel[]>(this.apiUrl + '/catalogue/' + name);
  }

  public saveCatalogue(catalogue: any) {
    return this.http.post<any>(`${this.apiUrl}/catalogue/`, catalogue);
  }

  public getClassrooms(): Observable<ClassroomModel[]> {
    return this.http.get<ClassroomModel[]>(this.apiUrl + '/classrooms/class');
  }

  public getInstructors(): Observable<any> {
    return this.http.get<any>(this.apiUrlUser + '/instructors/all/');
  }

  // detail plan

  public getPlanId(courseCode: any): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/code/plan/' + courseCode);
  }

  getDetailsAll() {
    return this.http.get<any>(`${this.apiUrl}/detail/all`);
  }

  getDetailAllCourses(id: any) {
    return this.http.get<any>(`${this.apiUrl}/detailPlan/course/${id}`);
  }

  public getDetailPlans(planId: number): Observable<DetailPlanModel[]> {
    this.loading.next(true);
    return this.http
      .get<DetailPlanModel[]>(this.apiUrl + '/detailPlan/all/' + planId)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  public getDetailPlan(id: number): Observable<DetailPlanModel> {
    return this.http.get<DetailPlanModel>(this.apiUrl + '/detailPlan/' + id);
  }

  updateDetailPlan(detailPlan: any) {
    return this.http.put(
      this.apiUrl + '/detailPlan/' + detailPlan.id,
      detailPlan
    );
  }

  saveEditDetailPlan(detailPlan: any, horarioSelect: any) {
    if (!horarioSelect) {
      return this.http.post(this.apiUrl + '/detailPlan/save', detailPlan);
    } else {
      return this.http.put(
        this.apiUrl + '/detailPlan/' + horarioSelect.id,
        detailPlan
      );
    }
  }

  saveDetailPlan(data: DetailPlanModel) {
    return this.http.post(this.apiUrl + '/detailPlan/save', data);
  }

  deleteDetailPlan(id: number) {
    return this.http.delete(this.apiUrl + '/detailPlan/' + id);
  }

  /// topics

  getTopics(courseId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl + '/topics/' + courseId);
  }

  saveTopics(courseId: number, topics: Topic[]): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + '/topics/save/' + courseId,
      topics
    );
  }

  deleteTopic(topicId: any) {
    return this.http.delete(this.apiUrl + '/topics/' + topicId);
  }

  deleteSubTopic(subtopicId: any) {
    return this.http.delete(this.apiUrl + '/topics/sub/' + subtopicId);
  }

  //////sponsor

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl + '/sponsor/all/');
  }

  saveSponsor(sponsor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/sponsor/', sponsor);
  }

  ////////updateByAfterCourse
  public updateByAfterCourse(courseAfter: any, id: any): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + '/updateByAfterCourse/' + id,
      courseAfter
    );
  }

  ////////detailPlanInstructor
  getInstructorsByDetail(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/detailPlanInstructor/all/' + id);
  }

  saveInstructorDetail(instructorDetail: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + '/detailPlanInstructor/',
      instructorDetail
    );
  }

  deleteInstructorFromDetail(id: any) {
    return this.http.delete(this.apiUrl + '/detailPlanInstructor/' + id);
  }

  //change state course
  updateCourseByState(courseId: number, newStatus: string) {
    this.loading.next(true);
    const endpoint = `${this.apiUrl}/change-course/${courseId}/state-change/${newStatus}`;
    return this.http.patch(endpoint, null).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
}
