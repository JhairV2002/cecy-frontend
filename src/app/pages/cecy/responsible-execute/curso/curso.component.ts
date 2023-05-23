import { Component } from '@angular/core';
import { CursoService } from './curso.service';
import { Curso } from './curso';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent {
    constructor(
      private cursoService: CursoService,
      private activateRouter: ActivatedRoute
    ){}

    cursoList: Curso[]=[]

    /* currentEntity: Curso = {
      id: 0,
      codeCourse: "",
      name: "",
      modality: "",
      schoolPeriod: ""
    }; */

    ngOnInit(): void{
      /* this.activateRouter.paramMap.subscribe(
        (params) => {
          if(params.get("id")){
            this.findById(parseInt(params.get("id")!))
          }
        }
      ) */
      this.findAll();
        }

    /* findById(id: number): void{
      this.cursoService.findById(id).subscribe(
        (response) => {
          this.currentEntity=response;
        }
      )
    } */

    public findAll(): void {
      this.cursoService.findAll().subscribe(
        (response) => this.cursoList = response
      )
    }

    public findByName(term: string): void{
      if(term.length>=2){
        this.cursoService.findByName(term).subscribe(
          (response) => this.cursoList = response
        )
      }
      if(term.length===0){
        this.findAll();
      }
    }

    public findBySchoolPeriod(term: string): void{
      if(term.length>=3){
        this.cursoService.findBySchoolPeriod(term).subscribe(
          (response) => this.cursoList = response
        )
      }
      if(term.length===0){
        this.findAll();
      }
    }

}
