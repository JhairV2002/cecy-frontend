import { Component } from '@angular/core';
import { CursoService } from './curso.service';
import { Curso } from './curso';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesComponent } from '../notas/estudiantes.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent {
    constructor(
      private cursoService: CursoService,
      private activateRouter: ActivatedRoute,
      private router: Router
    ){}

  redireccionar() {
    // Aquí defines la ruta a la que quieres redirigir
    const rutaDestino = '/notas/estudiantes.component.html';
    
    // Puedes agregar más lógica antes de la redirección si es necesario
    
    this.router.navigate([EstudiantesComponent]);
  }

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

        nextPage(){
          console.log('click');
          this.router.navigate(['/cecy/responsible-execute/mis-cursos/notas/estudiante']);
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
