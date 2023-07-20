import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { MessageService } from '@services/core';
import { PhotographicRecordHttpService } from '@services/cecy/photographicRecord-http.service';
import { PhotographicRecordModel } from '@models/cecy/photographic-record.model';
import { TopicModel } from '@models/cecy';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnDestroy {
  public IMAGE_URL: string = '';
  public imageForm: FormGroup = this.newImageForm;
  records: PhotographicRecordModel[] = [];
  record: PhotographicRecordModel[] = [];
  id: FormControl = new FormControl('');
  selectedRecords: PhotographicRecordModel = {};
  detailPlanificationId: number = 0;
  tabIndex: number = 0;
  cols: any[];
  selectedRecordP: number = 0;

  public files: any[] = [];
  public displayModalImages: boolean = false;
  public loadingUploadImages: boolean = false;
  public loadingImages: boolean = false;

  public STORAGE_URL: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photographicRecordHttpService: PhotographicRecordHttpService,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.detailPlanificationId = this.activatedRoute.snapshot.params['id'];
    this.idField.setValue(this.detailPlanificationId);
    console.log(this.idField.value);
    this.STORAGE_URL = environment.STORAGE_URL;
    /* this.IMAGE_URL =environment.IMAGE_URL */

    this.cols = [
      { field: 'image', header: 'Imagen' },
      { field: 'description', header: 'Descripcion' },
      { field: 'numberWeek', header: 'Numero de semana' },
      { field: 'registeredAt', header: 'Fecha' },
    ];
  }

  ngOnInit(): void {
    this.getPhotographicRecords();
  }

  get newImageForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      image: [null],
    });
  }

  showModalImages(record: number) {
    this.selectedRecordP = record;
    this.displayModalImages = true;
  }

  uploadImages(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('images[]', file);
    }
    this.photographicRecordHttpService
      .uploadImageRecord(this.selectedRecordP, formData)
      .subscribe((response) => {
        this.imageField.setValue(response.data.image);
        console.log(response);
        this.messageService.success(response);
      });
  }
  getPhotographicRecords() {
    this.photographicRecordHttpService
      .getPhotographicRecord(this.detailPlanificationId)
      .subscribe((response) => {
        this.records = response.data;
        this.record = response.data.id;
        this.id.patchValue(this.record);
      });
  }
  get idField() {
    return this.imageForm.controls['id'];
  }
  get imageField() {
    return this.imageForm.controls['image'];
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  selectRecord(record: PhotographicRecordModel) {
    this.selectedRecords = record;
  }
  redirectAttendance() {
    this.router.navigate([
      '/cecy/instructor/attendance/',
      this.detailPlanificationId,
    ]);
  }
}
