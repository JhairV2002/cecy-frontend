import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css'],
})
export class CarrerasComponent implements OnInit {
  constructor(
    private carreraService: CarrerasService,
    private router: Router,
    private authService: AuthService,

  ) { }
  carreras$ = this.carreraService.getAllCarreras();
  loading$ = this.carreraService.loading;
  courses: [] | any = [];



  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (data: any) => {
        if (data !== null) {
          if (data[0].role.name === 'coordinator_cecy') {
            this.carreraService.getAllCoursesApproved().subscribe({
              next: (courses: any) => {
                console.log('ALL COURSES FOR MATRICULACION', courses);
                this.courses = courses
              },
              error: (error) => {
                console.error(error)
              }
            });
          } else if (data[0].role.name === 'assistant_cecy') {
            console.log(data[0].role.name)
            this.carreraService.getAllCursosByAssistant().subscribe({
              next: (courses: any) => {
                console.log('CURSOS PARA MATRICULACION', courses);
                this.courses = courses
              },
              error: (error) => {
                console.error(error)
              }
            });
          }
        }
      },
      error: (error) => {
        console.error(error);
      },
    });


  }
  viewStudents(planification: any) {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
        console.log('ID DE REDIRECCION', planification);
        if (user[0].role.name === 'coordinator_cecy') {
          this.router.navigate([
            `/cecy/coordinator-cecy/matricula/career/${planification.careerId}/${planification.name}/course/${planification.id}`,
          ]);
        } else if (user[0].role.name === 'assistant_cecy') {
          this.router.navigate([
            `/cecy/assistant-cecy/matricula/career/${planification.careerId}/${planification.name}/course/${planification.id}`,
          ]);
        }
      }
    });
  }
}
