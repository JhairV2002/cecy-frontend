import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { UploadEvent } from '@models/core';
import { AsistenciaService } from './asistencia.service';
import { MessageService } from 'primeng/api';
import { MessageService as MessageLocal } from '@services/core';
import { formatDate } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
})
export class AsistenciaComponent implements OnInit {
  formAttendance = this.fb.group({
    fecha: [new Date(), [Validators.required]],
    observaciones: ['', Validators.required],
    evidenciaFotografica: [''],
    courseId: [null],
  });
  helpDialogVisible: boolean = false;
  imagenBase64: string = '';
  isCreating: boolean = true;
  img: string = '';
  editImageForNew: boolean = false;
  fileErrorMessage: string = '';

  constructor(
    private AsistenciaService: AsistenciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private messageLocal: MessageLocal,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const asistenciaId = this.activatedRoute.snapshot.params['asistenciaId'];
    this.activatedRoute.snapshot.params;
    console.log(asistenciaId);
    if (asistenciaId) {
      this.AsistenciaService.getAttendanceById(asistenciaId).subscribe({
        next: (data: any) => {
          this.isCreating = false;
          this.img = data.evidenciaFotografica;

          const patchedValue = {
            ...data,
            fecha: new Date(data.fecha),
          };

          patchedValue.fecha = formatDate(
            patchedValue.fecha,
            'yyyy-MM-dd',
            'en-US'
          );

          this.formAttendance.patchValue(patchedValue);
          console.log('NG NGONINIT', data);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }

  onSubmit() {
    if (this.formAttendance.valid) {
      if (this.isCreating) {
        this.saveAttendance();
      } else {
        this.updateAttendance();
      }
    } else {
      this.formAttendance.markAllAsTouched();
    }
  }

  onFileUpload(event: UploadEvent) {
    console.log('evento con file', event);
    const file = event.currentFiles[0];
    console.log(file.name);
    console.log('file ', file);

    if (file) {
      const maxSizeInBytes = 10 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.fileErrorMessage =
          'El archivo seleccionado excede el tamaño máximo permitido (10MB).';
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar la imagen',
          detail:
            'El archivo seleccionado excede el tamaño máximo permitido (10 MB).',
        });
      } else {
        // Check file extension
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];
        const fileExtension = file.name
          .toLowerCase()
          .substring(file.name.lastIndexOf('.'));

        if (allowedExtensions.includes(fileExtension)) {
          this.fileErrorMessage = '';
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagenBase64 = e.target.result;
          };
          reader.readAsDataURL(file);
          this.messageService.add({
            severity: 'info',
            summary: 'Cargado...',
            detail: 'Se ha cargado la imagen con éxito',
          });
        } else {
          this.fileErrorMessage =
            'El formato de archivo no es compatible. Solo se permiten archivos PNG y JPG.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error al cargar la imagen',
            detail:
              'El formato de archivo no es compatible. Solo se permiten archivos PNG y JPG.',
          });
        }
      }
    }
  }

  saveAttendance() {
    console.log('creating OK');
    const id = parseInt(this.activatedRoute.snapshot.params['courseId']);

    const { fecha, observaciones, evidenciaFotografica, courseId } =
      this.formAttendance.value;
    const valuesForm = {
      fecha,
      observaciones,
      evidenciaFotografica: this.imagenBase64,
      courseId: id,
    };
    this.AsistenciaService.createAttendance(valuesForm).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: `Creado`,
          detail: `${data.message}`,
        });
        setTimeout(() => {
          this.activatedRoute.paramMap.subscribe((param) => {
            this.router.navigate([
              `/cecy/responsible-execute/course/${param.get(
                'courseId'
              )}/date-list`,
            ]);
          });
        }, 500);
      },
      error: (error) => {
        this.messageLocal.error(error);
      },
    });
  }

  editImage() {
    this.editImageForNew = true;
  }

  updateAttendance() {
    console.log('updating ok');
    const asistenciaId = this.activatedRoute.snapshot.params['asistenciaId'];
    const valuesForm = this.formAttendance.value;

    if (this.editImageForNew) {
      console.log('se activo para editar la imagen');
      if (this.formAttendance.invalid || !this.imagenBase64) {
        console.log('No se encontro la imagen');
        this.messageService.add({
          severity: 'warn',
          summary: `No encontrado`,
          detail: `No se encontro la imagen`,
        });
        return;
      }

      const { fecha, observaciones, evidenciaFotografica } =
        this.formAttendance.value;
      const valuesForm = {
        fecha,
        observaciones,
        evidenciaFotografica: this.imagenBase64,
      };
      this.AsistenciaService.updateAttendance(
        valuesForm,
        asistenciaId
      ).subscribe({
        next: (data: any) => {
          console.log('DATA', data);
          this.messageService.add({
            severity: 'info',
            summary: `Actualizado`,
            detail: `${data.message}`,
          });
          setTimeout(() => {
            this.activatedRoute.paramMap.subscribe((param) => {
              this.router.navigate([
                `/cecy/responsible-execute/course/${param.get(
                  'courseId'
                )}/date-list`,
              ]);
            });
          }, 500);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'danger',
            summary: `Error al actualizar`,
            detail: `${error.error}`,
          });
        },
      });
    }
  }

  help() {
    this.helpDialogVisible = true;
  }

  redireccionar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get('courseId')}/date-list`,
      ]);
    });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get dateField() {
    return this.formAttendance.controls['fecha'];
  }

  get observationField() {
    return this.formAttendance.controls['observaciones'];
  }

  get evidentsPhoto() {
    return this.formAttendance.controls['evidenciaFotografica'];
  }
}
