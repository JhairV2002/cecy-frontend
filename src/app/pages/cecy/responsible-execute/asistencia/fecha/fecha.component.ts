import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../asistencia.service';
import { Asistencia } from '../asistencia.model';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
})
export class FechaComponent implements OnInit {
  loading$ = this.asistenciaService.loading$;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService,
    public messageService: MessageService
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
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get(
          'courseId'
        )}/attendance/create`,
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
}
