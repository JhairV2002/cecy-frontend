import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { UploadEvent } from '@models/core';
import { AsistenciaService } from './asistencia.service';
import { MessageService } from 'primeng/api';
import { MessageService as MessageLocal } from '@services/core';

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
  imagenBase64: string = '';
  isCreating: boolean = true;
  id: number = 0;

  constructor(
    private AsistenciaService: AsistenciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private messageLocal: MessageLocal
  ) {}
  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['courseId'];
    console.log(this.id);
    const id = this.activatedRoute.snapshot.params['courseId'];
    if (id) {
      this.AsistenciaService.getAttendanceByIdCourse(id).subscribe({
        next: (data) => {
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
    console.log(event);
    const file = event.currentFiles[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('QUE HAY AQUI', e);
        this.imagenBase64 = e.target.result;
        console.log('BASE 64', this.imagenBase64);
      };
      reader.readAsDataURL(file);
      this.messageService.add({
        severity: 'info',
        summary: 'Cargado...',
        detail: 'Se ha cargado la imagen con Éxito',
      });
    }
  }

  saveAttendance() {
    console.log('creating OK');
    const id = parseInt(this.activatedRoute.snapshot.params['courseId']);

    const { fecha, observaciones, evidenciaFotografica, courseId } =
      this.formAttendance.value;
    console.log();
    const valuesForm = {
      fecha,
      observaciones,
      evidenciaFotografica: this.imagenBase64,
      courseId: id,
    };
    console.log('ID DEL CURSO', id);
    console.log(valuesForm);
    this.AsistenciaService.createAttendance(valuesForm).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: `Creado`,
          detail: `${data.message}`,
        });
      },
      error: (error) => {
        this.messageLocal.error(error);
      },
    });
  }

  updateAttendance() {
    console.log('updating ok');
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
