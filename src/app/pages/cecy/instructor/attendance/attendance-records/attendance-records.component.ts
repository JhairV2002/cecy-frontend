import {Component, Input, OnInit} from '@angular/core';
import {PhotographicRecordHttpService} from "@services/cecy/photographicRecord-http.service";
import {PhotographicRecordModel, RecordModel} from "@models/cecy/photographic-record.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DetailAttendanceModel} from "@models/cecy";
import {MessageService} from "@services/core";
import {FileModel, ImageModel, PaginatorModel} from "@models/core";

@Component({
  selector: 'app-attendance-records',
  templateUrl: './attendance-records.component.html',
  styleUrls: ['./attendance-records.component.scss']
})
export class AttendanceRecordsComponent implements OnInit {

  record: PhotographicRecordModel[] = [];
  detailPlanificationId: number;
  id: FormControl = new FormControl('');
  public formRecords: FormGroup = this.newFormRecords;
  public progressBar: boolean = false;

  @Input() detailPlanification: DetailAttendanceModel = {};
  selectedPhotographicRecords: PhotographicRecordModel = {};
  selectedPhotographicRecord: number;
  dialogForms: boolean = false; // optional

  constructor(
    private formBuilder: FormBuilder,
    private photographicRecordHttpService: PhotographicRecordHttpService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public messageService: MessageService,
  ) {
  }
  get newFormRecords(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      detailPlanificationId: [this.detailPlanificationId],
      description: [null, [Validators.required,Validators.minLength(20)]],
      numberWeek: [null, [Validators.required,Validators.min(1),Validators.max(4)]],
    });
  }

  ngOnInit(): void {
    this.detailPlanificationId = this.activatedRouter.snapshot.params['id'];
  }
  onSubmit() {
    console.log(this.formRecords);
    this.detailPlanificationIdField.setValue(this.activatedRouter.snapshot.params['id']);
    if (this.formRecords.valid) {
      if (this.idField.value) {
         this.update(this.formRecords.value);
      }
      else {
        this.store(this.formRecords.value);
      }
    } else {
      this.formRecords.markAllAsTouched();
    }
  }
  update(record: PhotographicRecordModel): void {
    this.progressBar = true;
    this.photographicRecordHttpService.updatePhotographicRecord(this.detailPlanification.id, record).subscribe(
      response => {
      }
    );
  }
  store(record: PhotographicRecordModel): void {
    this.progressBar = true;
    this.photographicRecordHttpService.storePhotographicRecord(record).subscribe(
      response => {
      }
    );
  }
  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }
  get idField() {
    return this.formRecords.controls['id'];
  }

  get detailPlanificationIdField() {
    return this.formRecords.controls['detailPlanificationId'];
  }
  get descriptionField() {
    return this.formRecords.controls['description'];
  }
  get numberWeekField() {
    return this.formRecords.controls['numberWeek'];
  }

  showForm(children: number){
    this.selectedPhotographicRecord =  children;
    // this.topicHttpService.selectTopic(children)
    this.dialogForms = true;
    console.log(this.selectedPhotographicRecord)
  }

  selectPhotographicRecords(photographicRecord: PhotographicRecordModel){
    this.selectedPhotographicRecords =  photographicRecord;
  }
  redirectAttendance() {
    this.router.navigate(['/cecy/instructor/attendance/',this.detailPlanificationId ]);
  }
}
