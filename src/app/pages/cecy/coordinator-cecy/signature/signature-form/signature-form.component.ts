import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { MessageService as MessageLocal } from '@services/core';

import { UploadEvent } from '@models/core';
import { SignatureService } from '@services/cecy/coordinator-cecy';

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.css'],
})
export class SignatureFormComponent implements OnInit {
  loading$ = this.signatureService.loading$;
  formSignature = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    // firma: ['', [Validators.required]],
  });
  edit: boolean = false;

  constructor(
    private signatureService: SignatureService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private messageService: MessageService,
    private messageLocal: MessageLocal,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadSignatureById();
  }

  loadSignatureById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.signatureService.getSignatureById(id).subscribe((data) => {
        console.log('SIGN INDIVIDUAL', data);
        this.formSignature.patchValue(data);
        this.edit = true;
      });
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.formSignature.valid) {
      if (this.edit) {
        this.updateSignature();
      } else {
        this.createSignature();
      }
    } else {
      console.log('error');
      this.formSignature.markAllAsTouched();
    }
  }

  updateSignature() {
    console.log('Update');
    const valuesForm = this.formSignature.value;
    const id = this.activatedRoute.snapshot.params['id'];

    this.signatureService.updateByIdSignature(valuesForm, id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({
          severity: 'info',
          summary: `Actualizado`,
          detail: `${data.message}`,
        });
        this.formSignature.reset();
        setTimeout(() => {
          this.router.navigate(['/cecy/coordinator-cecy/signature']);
        }, 1500);
      },
      error: (error) => {
        this.messageLocal.error(error);
      },
    });
  }
  createSignature() {
    console.log('Create');
    const valuesForm = this.formSignature.value;
    this.signatureService.createSignature(valuesForm).subscribe({
      next: (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: `Creado`,
          detail: `${data.message}`,
        });
        this.formSignature.reset();
        setTimeout(() => {
          this.router.navigate(['/cecy/coordinator-cecy/signature']);
        }, 1500);
      },
      error: (error) => {
        this.messageLocal.error(error);
      },
    });
  }

  onFileUpload(event: UploadEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get namesField() {
    return this.formSignature.controls['nombres'];
  }

  get lastnamesField() {
    return this.formSignature.controls['apellidos'];
  }

  get cedulaField() {
    return this.formSignature.controls['cedula'];
  }
}
