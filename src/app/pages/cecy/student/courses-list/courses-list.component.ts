import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inscription } from '@models/cecy';
import { InscriptionService } from '@services/cecy';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListaComponent implements OnInit {
  constructor(
    private router:Router,
    private inscriptionService: InscriptionService
    ) {}

    listInscription : Inscription[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  public findAll():void {
    this.inscriptionService.findAll().subscribe(
      (response) => this.listInscription= response
    )
  }

  updateForm(){
    this.router.navigate(["/cecy/student/form"])
  }

}
