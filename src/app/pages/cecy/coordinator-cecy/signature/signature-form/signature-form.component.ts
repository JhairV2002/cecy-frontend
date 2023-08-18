import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { MessageService } from 'primeng/api';
import { MessageService as MessageLocal } from '@services/core';
import { UploadEvent } from '@models/core';
import { SignatureService } from '@services/cecy/coordinator-cecy';
import { Signature } from '@models/cecy/coordinator-cecy';
import { CertificateRequestService } from '../../../assistant/solicitud-certificado/certificate-request.service';
import { catchError, of, switchMap } from 'rxjs';

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
    firma: [''],
  });
  sign: Signature | null = null;
  filename: string = '';
  formData = new FormData();
  imagenSeleccionada: boolean = false;
  url?: string;
  isCreating: boolean = true;
  editImage: boolean = false;

  constructor(
    private signatureService: SignatureService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private messageService: MessageService,
    private messageLocal: MessageLocal,
    private router: Router,
    private certificateService: CertificateRequestService
  ) {}
  ngOnInit(): void {
    this.loadSignatureById();
  }

  loadSignatureById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.signatureService
        .getSignatureById(id)
        .pipe(
          switchMap((data: any) => {
            console.log('SIGN INDIVIDUAL', data);
            this.formSignature.patchValue(data);
            return this.signatureService.getByIdFile(data.firma);
          })
        )
        .subscribe({
          next: (data: any) => {
            console.log('Filessssssss', data);
            this.isCreating = false;
            this.url = data.url;
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  onSubmit() {
    if (this.formSignature.valid) {
      if (this.isCreating) {
        this.createSignature();
      } else {
        this.updateSignature();
      }
    } else {
      console.log('error');
      this.formSignature.markAllAsTouched();
    }
  }

  cancelEditImage() {
    this.editImage = true;
  }

  onFileUpload(event: UploadEvent) {
    let formatoFecha = formatDate(new Date(), 'yyyy-MM-dd-hh-mm-ss', 'en_US');
    this.filename =
      this.formSignature.value.cedula + '-' + formatoFecha + '.png'.trim();
    console.log('SUBIENDOOOOOO0', event.currentFiles[0]);
    const file = event.currentFiles[0];
    if (file) {
      this.formData.append('file', file, this.filename);
      console.log('DATAFORM', this.formData);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'Cargado...',
      detail: 'Se ha cargado la imagen con Éxito',
    });
  }

  updateSignature() {
    console.log('Update');
    const valuesForm = this.formSignature.value;
    const id = this.activatedRoute.snapshot.params['id'];
    console.log('NUEVOS VALORES', valuesForm);
    if (this.editImage) {
      if (this.formSignature.invalid || !this.filename) {
        console.log('No se encontro la imagen');
        this.messageService.add({
          severity: 'warn',
          summary: `No encontrado`,
          detail: `No se encontro la imagen`,
        });
        return;
      }
    }

    console.log('DESPUES NUEVOS VALORES', valuesForm);

    this.signatureService
      .updateByIdSignature(valuesForm, id)
      .pipe(
        switchMap((data: any) => {
          console.log(data);
          this.messageService.add({
            severity: 'info',
            summary: `Actualizado`,
            detail: `${data.message}`,
          });
          return this.signatureService.updateByNameFile(
            valuesForm?.firma,
            this.formData
          );
        }),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe({
        next: (data: any) => {
          if (data) {
            console.log('UPDATE IMAGE', data);
            this.formSignature.reset();
            setTimeout(() => {
              this.router.navigate(['/cecy/coordinator-cecy/signature']);
            }, 500);
          }
        },
        error: (error) => {
          this.messageLocal.error(error);
        },
      });
  }

  createSignature() {
    console.log('creating');
    if (this.formSignature.invalid || !this.filename) {
      console.log('No se encontro la imagen');
      this.messageService.add({
        severity: 'warn',
        summary: `No encontrado`,
        detail: `No se encontro la imagen`,
      });
      return;
    }

    const { nombres, apellidos, cedula, firma } = this.formSignature.value;

    const valuesForm = {
      nombres,
      apellidos,
      cedula,
      firma: this.filename,
    };

    this.certificateService
      .uploadFile(this.formData)
      .pipe(
        switchMap((data) => {
          console.log('subiendo', data);
          this.formData = new FormData();

          return this.signatureService.createSignature(valuesForm);
        })
      )
      .subscribe({
        next: (data: any) => {
          console.log('ME ESTA SUBIENDO ???', data);
          this.formSignature.reset();
          this.filename = '';
          this.messageService.add({
            severity: 'success',
            summary: `Creado`,
            detail: `${data.message}`,
          });
          this.formSignature.reset();
          setTimeout(() => {
            this.router.navigate(['/cecy/coordinator-cecy/signature']);
          }, 500);
        },
        error: (error) => {
          this.messageLocal.error(error);
        },
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
