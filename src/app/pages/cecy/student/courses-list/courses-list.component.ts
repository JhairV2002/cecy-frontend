import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListaComponent implements OnInit {
  constructor(
    private router:Router,
    ) {}

  ngOnInit(): void {

  }

  updateForm(){
    this.router.navigate(["/cecy/estudiante/student/form"])
  }

}
