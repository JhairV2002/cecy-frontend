import { Component, OnInit } from '@angular/core';
import {AttendanceModel, InstructorModel, RegistrationModel} from "@models/cecy";
import { AttendanceHttpService } from "@services/cecy/attendance-http.service";
import { ActivatedRoute, Router } from "@angular/router";
import {MessageService} from "@services/core";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {

  attendance: AttendanceModel[] = [];
  attendanceId: any;
  first = 0;
  rows = 10;
  cols: any[];

  dialogForm: boolean = false; // optional

  selectedAttendance: AttendanceModel = {};

  constructor(
    private api: AttendanceHttpService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public messageService: MessageService
    ) {
    this.attendanceId = this.activatedRouter.snapshot.params['id'];

    this.cols = [
      { field: 'registeredAt', header: 'Fecha' }
      // { field: 'edit', header: 'Editar' },
      // { field: 'records', header: 'Registro fotografico' },
      // { field: 'delete', header: 'Eliminar' },
    ];
  }

  ngOnInit(): void {
    this.getAttendances();
  }
  getAttendances() {
    this.api.getAttendanceDetailPlanification(this.attendanceId).subscribe(response => {
      this.attendance = response.data;
      // console.log(this.attendance);
    })
  }

  deleteAttendance(attendance: AttendanceModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
           console.log(attendance.id);
          this.api.deleteAttendance(attendance.id!).subscribe(
            response => {
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }
  redirectParticipants(attendanceId: number) {
    this.router.navigate(['/cecy/instructor/participant-attendance/',attendanceId]);
  }

  redirectPhotograficRecords() {
    this.router.navigate(['/cecy/instructor/attendance-records/',this.attendanceId]);
  }
  redirectParticipantList() {
    this.router.navigate(['/cecy/instructor/participant-course/',this.attendanceId ]);
  }
  showForm(){
    this.dialogForm = true;
  }
}
