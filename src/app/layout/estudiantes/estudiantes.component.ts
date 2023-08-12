import { Component, OnInit } from '@angular/core';
import { AuthStudentService } from '@services/auth';



@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  constructor(
    private authStudentService: AuthStudentService,
  ) { }

  ngOnInit(): void {
    this.authStudentService.getProfileStudent().subscribe();
  }
}
