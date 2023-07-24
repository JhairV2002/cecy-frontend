import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CourseService } from '@services/cecy-v1/course.service';
import { MessageService } from '../../../../../services/core/message.service';


@Component({
  selector: 'app-assignment-instructors-form',
  templateUrl: './assignment-instructors-form.component.html',
})
export class AssignmentInstructorsFormComponent implements OnInit {

  @Input() data: any;
  @Output() dialogForm = new EventEmitter<boolean>();
  public formDetailPlanificationInstructor: FormGroup = this.newFormDetailPlanification;
  instructors: any;
  listInstructors: any;
  repeatInstructor: any;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadInstructors()
    this.getInstructorsByDetailPlanification()
  }

  get newFormDetailPlanification(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      instructorId: [null, [Validators.required]],
      detailPlanificationId: null
    });
  }

  onSubmit() {
    if (this.restrictionInstructor()) {
      this.messageService.warningAlert('El instructor ya ha sido seleccionado');
      return;
    }
    if (this.formDetailPlanificationInstructor.valid) {
      this.saveDetail()
    }
  }


  saveDetail() {
    this.formDetailPlanificationInstructor.patchValue({
      detailPlanificationId: this.data.id
    });
    this.courseService.saveInstructorDetail(this.formDetailPlanificationInstructor.value).subscribe(
      res => {
        this.messageService.successCourse(res)
        this.getInstructorsByDetailPlanification()
      }
    )
  }

  getInstructorsByDetailPlanification() {
    this.courseService.getInstructorsByDetail(this.data.id).subscribe(
      res => {
        this.listInstructors = res
      }
    )
  }


  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get instructorField() {
    return this.formDetailPlanificationInstructor.controls['instructorId'];
  }

  loadInstructors() {
    this.courseService.getInstructors().subscribe((response) => {
      this.instructors = response;
    });
  }

  deleteInstructor(id: number) {
    this.courseService.deleteInstructorFromDetail(id).subscribe(
      res => {
        this.getInstructorsByDetailPlanification()
      }
    )
  }

  restrictionInstructor() {

    this.repeatInstructor = this.listInstructors.filter((item: any) =>
      item.instructorId===this.formDetailPlanificationInstructor.value.instructorId
    );

    return this.repeatInstructor.length !== 0;
  }


}
