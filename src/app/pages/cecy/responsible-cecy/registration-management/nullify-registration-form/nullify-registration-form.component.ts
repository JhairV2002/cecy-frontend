import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistrationHttpService } from '@services/cecy/registration-http.service';
import { MessageService } from '@services/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nullify-registration-form',
  templateUrl: './nullify-registration-form.component.html',
  styleUrls: ['./nullify-registration-form.component.scss'],
})
export class NullifyRegistrationFormComponent implements OnInit {
  /*DDRC-C:observables */
  private registration$ = this.registrationHttpService.registration$;
  private unsubscribe$ = new Subject<void>();
  public formNullifyRegistration: FormGroup = this.newFormNullifyRegistration;
  public progressBar: boolean = false;
  @Output() dialogForm = new EventEmitter<boolean>();

  customNullification: any = {};
  registrationId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private registrationHttpService: RegistrationHttpService,
    public messageService: MessageService
  ) {
    this.registration$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        // Llena el formulario
        if (response.id !== undefined) {
          this.customNullification.id = response.id;
          this.customNullification.email = response.participant.user.email;
          this.customNullification.lastname =
            response.participant.user.lastname;
          this.customNullification.name = response.participant.user.name;
          this.customNullification.username =
            response.participant.user.username;
          this.customNullification.observations = response.observations;
          this.registrationId = response.id;
          this.formNullifyRegistration.patchValue(this.customNullification);
        }
      });
  }

  clearTextareaValue() {
    this.formNullifyRegistration.controls['observations'].setValue('');
  }

  ngOnInit(): void {}

  get newFormNullifyRegistration(): FormGroup {
    return this.formBuilder.group({
      email: [{ value: null, disabled: true }, [Validators.email]],
      id: [{ value: null, disabled: true }],
      lastname: [{ value: null, disabled: true }],
      name: [{ value: null, disabled: true }],
      username: [{ value: null, disabled: true }],
      observations: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formNullifyRegistration.valid) {
      this.confirmNullify();
    } else {
      this.formNullifyRegistration.markAllAsTouched();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  confirmNullify(): void {
    this.messageService.questionNullify({}).then((result) => {
      if (result.isConfirmed) {
        this.registrationHttpService
          .nullifyRegistration(
            this.registrationId,
            this.formNullifyRegistration.value
          )
          .subscribe(
            (response) => {
              this.messageService.success(response);
              this.dialogForm.emit(false);
            },
            (error) => {
              this.messageService.error(error);
            }
          );
      }
    });
  }

  // getters
  get idField() {
    return this.formNullifyRegistration.controls['id'];
  }
  get emailField() {
    return this.formNullifyRegistration.controls['email'];
  }
  get usernameField() {
    return this.formNullifyRegistration.controls['username'];
  }
  get nameField() {
    return this.formNullifyRegistration.controls['name'];
  }
  get lastnameField() {
    return this.formNullifyRegistration.controls['lastname'];
  }
  get observationField() {
    return this.formNullifyRegistration.controls['observations'];
  }
}
