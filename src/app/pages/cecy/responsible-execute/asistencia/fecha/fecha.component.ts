import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../asistencia.service';
import { Asistencia } from '../asistencia.model';
import { MessageService } from '@services/core';
import { MessageService as MessageLocal } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageModalComponent } from './image-modal.component';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.css'],
})
export class FechaComponent implements OnInit {
  loading$ = this.asistenciaService.loading$;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService,
    public messageService: MessageService,
    public messageLocal: MessageLocal,
    private dialogService: DialogService
  ) {}

  fechas: Asistencia[] = [];

  ngOnInit(): void {
    this.getAllAttendanceByCourseId();
  }

  getAllAttendanceByCourseId() {
    const id = this.activatedRoute.snapshot.params['courseId'];
    this.asistenciaService.getAttendanceByIdCourse(id).subscribe({
      next: (data: any) => {
        this.fechas = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createAttendance() {
    console.warn('largo the fotografias: ', this.fechas.length);
    if (this.fechas.length >= 5) {
      this.messageLocal.add({
        severity: 'error',
        summary: 'Capacidad alcanzada',
        detail: 'El máximo de registros es 5. ',
      });
      return;
    }
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get('courseId')}/create`,
      ]);
    });
  }

  regresar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get(
          'courseId'
        )}/notes/students/`,
      ]);
    });
  }

  editAttendanceById(asistenciaId: number) {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get(
          'courseId'
        )}/attendance/${asistenciaId}`,
      ]);
    });
  }

  deleteAttendance(attendance: Asistencia) {
    console.log(attendance);
    this.messageService.questionDeleteUser({}).then((result) => {
      if (result.isConfirmed) {
        this.asistenciaService.deleteAttendanceById(attendance.id).subscribe({
          next: (data) => {
            this.messageService.successUser(data);
            this.getAllAttendanceByCourseId();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  showModal(imageUrl: string): void {
    this.dialogService.open(ImageModalComponent, {
      data: { imageUrl },
      header: 'Evidencia Fotográfica',
      width: '70%',
    });
  }
}
