import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttendanceModel, DetailAttendanceModel, RegistrationModel, CatalogueModel} from "@models/cecy";
import {DetailAttendanceHttpService} from "@services/cecy/detail-attendance-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotographicRecordModel} from "@models/cecy/photographic-record.model";
import {PhotographicRecordHttpService} from "@services/cecy/photographicRecord-http.service";
import { AttendanceHttpService, CatalogueHttpService, RegistrationHttpService } from '@services/cecy';
//nuevo
import { ColModel } from '@models/core';
import {FormControl} from "@angular/forms";
import {MessageService} from "@services/core";
@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {

  attendance: AttendanceModel[] = [];
  attendanceId: number;
  detailAttendanceId: number;

  catalogues$ = this.catalogueHttpService.catalogues$;
  catalogue$ = this.catalogueHttpService.catalogue$;
  catalogues: CatalogueModel[] = [];

  selectedState: string = '';
  dialogForm: boolean = false; // optional
  selectedAttendance: AttendanceModel = {};
  // detailAttendanceId: number;

  //nueva manera
  cols: ColModel[]; // conditional
  type: FormControl = new FormControl('');
  public progressBar: boolean = false;

  constructor(
    private registrationHttpService: RegistrationHttpService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private attendanceHttpService: AttendanceHttpService,
    private detailAttendanceHttpService: DetailAttendanceHttpService,
    private catalogueHttpService: CatalogueHttpService,
    private messageService: MessageService,

    ) {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'type', header: 'Estado'},
    ];
    this.attendanceId = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.getAttendances();
      // this.getPhotographicRecords();
      this.loadCategories();
  }
  getAttendances() {
    this.attendanceHttpService.getAttendance(this.attendanceId).subscribe(response => {
      console.log(response.data);
      this.attendance = response.data;
      this.type.patchValue(this.attendance);
    })
  }

  loadCategories(page: number = 1) {
   this.catalogueHttpService.getCatalogues('ATTENDANCE').subscribe(response => {
      this.catalogues = response.data;
      // console.log(this.catalogues)
    });
  }
  get typeField() {
    return this.type;
  }

  updateDetailAttendance(detailAttendance: DetailAttendanceModel,type: CatalogueModel): void {
    console.log(detailAttendance);
    console.log(type);
    this.progressBar = true;
    this.detailAttendanceHttpService.changeState(detailAttendance.id!,type).subscribe(
      response => {
        this.progressBar = false;
      },
      error => {
        this.progressBar = false;
      }
    );
  }
}
