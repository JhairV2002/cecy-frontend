import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CatalogueModel, PaginatorModel } from '@models/core';
import { MessageService } from '@services/core';
import { CatalogueHttpService, InstructorHttpService } from '@services/cecy';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss'],
})
export class InstructorFormComponent implements OnInit, OnDestroy {
  @Output() dialogForm = new EventEmitter<boolean>();
  private unsubscribe$ = new Subject<void>();
  private instructor$ = this.instructorHttpService.instructor$;
  public formInstructor: FormGroup = this.newFormInstructor;
  public progressBar: boolean = false;

  // Foreign Key
  public states: CatalogueModel[] = [];
  public types: CatalogueModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private instructorHttpService: InstructorHttpService,
    private catalogueHttpService: CatalogueHttpService,
    public messageService: MessageService
  ) {
    this.instructor$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response.id !== undefined) {
          this.formInstructor.reset(response);

          const { user } = response;

          // this.usernameField.patchValue(user.username);
          // this.nameField.patchValue(user.name);
          // this.lastnameField.patchValue(user.lastname);
          // this.emailField.patchValue(user.email);
          // this.phoneField.patchValue(user.phone);
        }
      });
  }

  ngOnInit(): void {
    this.loadStates();
    this.loadTypes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormInstructor(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      state: [null, [Validators.required]],
      type: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });
  }

  loadStates() {
    this.catalogueHttpService.getCatalogues('INSTRUCTOR_STATE').subscribe({
      next: (response) => {
        this.states = response.data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  loadTypes() {
    this.catalogueHttpService.getCatalogues('INSTRUCTOR').subscribe({
      next: (response) => {
        this.types = response.data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  onSubmit() {
    console.log(this.formInstructor.value);
    if (this.formInstructor.valid) {
      if (this.idField.value) {
        this.updateInstructor(this.formInstructor.value);
      } else {
        console.log('todo bien');
        this.storeInstructor(this.formInstructor.value);
      }
    } else {
      this.formInstructor.markAllAsTouched();
    }
  }

  storeInstructor(instructor: any): void {
    console.log(instructor);
    this.progressBar = true;
    this.instructorHttpService.storeInstructor(instructor).subscribe(
      (response) => {
        this.messageService.success(response);
        this.progressBar = false;
        this.dialogForm.emit(false);
      },
      (error) => {
        this.messageService.error(error);
        this.progressBar = false;
        this.dialogForm.emit(false);
      }
    );
  }

  updateInstructor(instructor: any): void {
    this.progressBar = true;
    this.instructorHttpService
      .updateInstructor(instructor.id!, instructor)
      .subscribe(
        (response) => {
          this.messageService.success(response);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        (error) => {
          this.messageService.error(error);
          this.progressBar = false;
          this.dialogForm.emit(false);
        }
      );
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get idField() {
    return this.formInstructor.controls['id'];
  }

  get stateField() {
    return this.formInstructor.controls['state'];
  }

  get typeField() {
    return this.formInstructor.controls['type'];
  }

  get usernameField() {
    return this.formInstructor.controls['username'];
  }

  get nameField() {
    return this.formInstructor.controls['name'];
  }

  get lastnameField() {
    return this.formInstructor.controls['lastname'];
  }

  get emailField() {
    return this.formInstructor.controls['email'];
  }

  get phoneField() {
    return this.formInstructor.controls['phone'];
  }
}
