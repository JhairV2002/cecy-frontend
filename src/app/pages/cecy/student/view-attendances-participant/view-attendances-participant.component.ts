import { Component, OnInit } from '@angular/core';
import { AttendanceModel } from '@models/cecy';
import { AttendanceHttpService } from '@services/cecy';
import { PaginatorModel } from '../../../../models/core/paginator.model';
import { MessageService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColModel } from '@models/core';
import { MenuItem } from 'primeng/api';
import { DetailAttendanceHttpService } from '../../../../services/cecy/detail-attendance-http.service';
import { DetailAttendanceModel } from '../../../../models/cecy/detail-attendance.model';
@Component({
  selector: 'app-view-attendances-participant',
  templateUrl: './view-attendances-participant.component.html',
  styleUrls: ['./view-attendances-participant.component.scss'],
})
export class ViewAttendancesParticipantComponent implements OnInit {
  detailAttendances$ = this.detailAttendanceHttpService.detailAttendances$;
  detailAttendance$ = this.detailAttendanceHttpService.detailAttendance$;

  checkedAttendance: boolean = true;

  detailAttendances: DetailAttendanceModel[] = [];
  detailAttendancesAll: DetailAttendanceModel[] = [];

  dialogForm: boolean = false; // optional
  progressBarDelete: boolean = false; // optional
  paginator: PaginatorModel = {}; // optional
  detailPlanificationId: any;
  currentAttendance: AttendanceModel = {};
  detailAttendanceToday: DetailAttendanceModel = {};

  loaded$ = this.detailAttendanceHttpService.loaded$;
  paginator$ = this.detailAttendanceHttpService.paginator$;

  cols: ColModel[]; // conditional
  items: MenuItem[] = []; // optional
  typeTable: any;
  registrationId: number = 0;
  currentDate: string = this.formatDate(new Date());

  constructor(
    private detailAttendanceHttpService: DetailAttendanceHttpService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.cols = [
      { field: 'registeredAt', header: 'Fecha' },
      { field: 'detailAttendances.type', header: 'Estado' },
      { field: 'duration', header: 'Número de horas' },
    ];
    this.detailPlanificationId = this.activatedRoute.snapshot.params['id'];
    this.paginator$.subscribe((response) => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadDetailAttendancesWithOutPaginate();
    this.loadCurrentDateDetailAttendance();
    this.loadDetailAttendances();
    this.checkAttendance();
    console.log(this.currentDate);
  }

  loadDetailAttendancesWithOutPaginate() {
    this.detailAttendanceHttpService
      .getByRegistration(this.detailPlanificationId)
      .subscribe((response) => {
        this.detailAttendancesAll = response.data;
      });
  }
  loadDetailAttendances(page: number = 1) {
    this.detailAttendanceHttpService
      .getDetailAttendancesByParticipant(page, this.detailPlanificationId)
      .subscribe((response) => {
        this.detailAttendances = response.data;
        this.registrationId =
          response.data[0].detailAttendances[0].registration.id;
      });
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadDetailAttendances(this.paginator.current_page);
  }

  async getDetailAttendanceCurrentDay() {
    this.detailAttendancesAll.forEach(async (detailAttendance) => {
      if (
        detailAttendance.attendance?.registeredAt ==
        this.currentAttendance.registeredAt
      ) {
        this.detailAttendanceToday = await detailAttendance;
      }
    });

    await this.saveAttendance();
  }

  loadCurrentDateDetailAttendance() {
    this.detailAttendanceHttpService
      .getCurrentDateDetailAttendance(this.detailPlanificationId)
      .subscribe((response) => {
        this.currentAttendance = response.data;
        console.log(this.currentAttendance);
      });
  }

  saveAttendance() {
    this.detailAttendancesAll.forEach((detailAttendance) => {
      if (
        detailAttendance.attendance?.registeredAt ==
        this.currentAttendance.registeredAt
      ) {
        this.detailAttendanceToday = detailAttendance;
      }
    });
    console.log(this.detailAttendanceToday);
    // this.detailAttendanceHttpService.updateType(this.detailAttendanceToday.id, { registration: { id: this.registrationId },type: {id:104}}).subscribe(response => { });
    // this.loadDetailAttendances();
  }

  checkAttendance() {
    this.detailAttendancesAll.forEach(async (detailAttendance) => {
      if (
        detailAttendance.attendance?.registeredAt ==
        this.currentAttendance.registeredAt
      ) {
        if (detailAttendance.type) {
          this.checkedAttendance = true;
        } else {
          this.checkedAttendance = false;
        }
      }
    });
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }
  redirectCourse() {
    this.router.navigate(['/cecy/student/my-courses']);
  }
}
