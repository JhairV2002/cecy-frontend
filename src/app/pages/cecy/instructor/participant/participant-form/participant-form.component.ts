import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CoreHttpService, MessageService } from '@services/core';
import { CatalogueModel } from '@models/core';
import { CatalogueHttpService, ParticipantHttpService } from '@services/cecy';

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss'],
})
export class ParticipantFormComponent implements OnInit, OnDestroy {
  @Output() dialogForm = new EventEmitter<boolean>();
  private unsubscribe$ = new Subject<void>();
  private participant$ = this.participantHttpService.participant$;
  public formParticipant: FormGroup = this.newFormParticipant;
  public progressBar: boolean = false;

  // Foreign Key
  public types: CatalogueModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private participantHttpService: ParticipantHttpService,
    private catalogueHttpService: CatalogueHttpService,
    private coreHttpService: CoreHttpService,
    public messageService: MessageService
  ) {
    this.participant$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response.id !== undefined) {
          this.formParticipant.reset(response);

          const { user } = response;

          // this.usernameField.patchValue(user.username);
          // this.nameField.patchValue(user.name);
          // this.lastnameField.patchValue(user.lastname);
          // this.emailField.patchValue(user.email);
          // this.phoneField.patchValue(user.phone);
        }
      });
  }

  loadTypes() {
    this.catalogueHttpService.getCatalogues('PARTICIPANT').subscribe({
      next: (response) => {
        this.types = response.data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  ngOnInit(): void {
    this.loadTypes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormParticipant(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      type: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formParticipant.valid) {
      if (this.idField.value) {
        this.updateParticipant(this.formParticipant.value);
      } else {
        this.storeParticipant(this.formParticipant.value);
      }
    } else {
      this.formParticipant.markAllAsTouched();
    }
  }

  storeParticipant(user: any): void {
    this.progressBar = true;
    this.participantHttpService.storeParticipant(user).subscribe(
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

  updateParticipant(participant: any): void {
    this.progressBar = true;
    this.participantHttpService
      .updateParticipantUser(participant.id!, participant)
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
    return this.formParticipant.controls['id'];
  }

  get emailField() {
    return this.formParticipant.controls['email'];
  }

  get lastnameField() {
    return this.formParticipant.controls['lastname'];
  }

  get nameField() {
    return this.formParticipant.controls['name'];
  }

  get usernameField() {
    return this.formParticipant.controls['username'];
  }

  get stateField() {
    return this.formParticipant.controls['state'];
  }

  get typeField() {
    return this.formParticipant.controls['type'];
  }

  get phoneField() {
    return this.formParticipant.controls['phone'];
  }
}
