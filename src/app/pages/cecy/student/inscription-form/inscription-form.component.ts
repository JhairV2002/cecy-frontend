import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  constructor(
    private router:Router,
    ) {}

  ngOnInit(): void {

  }

  updateForm(){
    this.router.navigate(["/cecy/student/courses-list"])
  }
}
