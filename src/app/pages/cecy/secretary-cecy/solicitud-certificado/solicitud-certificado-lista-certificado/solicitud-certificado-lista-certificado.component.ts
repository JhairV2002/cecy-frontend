import { Component, OnInit } from '@angular/core';
import { Certificado } from '../certificado';
import { CertificadoPdfServiceService } from '../certificado-pdf-service.service';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Course } from '@models/cecy/secretary-cecy';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../persona-service';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';


@Component({
  selector: 'app-solicitud-certificado-lista-certificado',
  templateUrl: './solicitud-certificado-lista-certificado.component.html',
})
export class SolicitudCertificadoListaCertificadoComponent implements OnInit{


 constructor(
  private certificadoService: CertificadoPdfServiceService,
  private cursoService: VisualizationCoursesService,
  private planificationCourse: PlanificationsCoursesService,
  private activatedRoute: ActivatedRoute,
  //modificar
  private personaService: PersonaService
  ){}


 //Entidades
 certificados: Certificado[]=[];
 certificadosGeneradosList: Certificado[]=[];
 allCourses: Course[] = [];
 courses: Course ={
  id: 0,
  name: '',
  image: '',
  planificationId:0,
}

 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((params) => {
    if (params.get('id')) {
      this.findById(parseInt(params.get('id')!));
    }
  });
  this.findAll()
 }


  //Buscar Todo
  public findAll(): void {
    this.certificadoService.findAll().subscribe((response) => {
      this.certificados = response;
      this.searchNames();
      this.validatorCourseEntity();
    });
  }
  //Buscar Nombres
  public searchNames(): void{
    this.certificados.forEach(
      (res)=>{
        this.personaService.findById(
          res.userId).subscribe(
          (persona) => {
            res.nameUser=persona.nombres+""+persona.apellidos}

        )
        this.cursoService.findById(
          res.courseId).subscribe(
            (val)=>{
              this.planificationCourse.planificationById(
                val.planificationId).subscribe((plan)=>{
                  res.nameCourse=plan.name
            })}
        )

      }
    )
  }

  //Busca con filtro en curso
  public validatorCourseEntity(): void {
    this.certificados.forEach(
      (certificado) => {
        if (certificado.courseId == this.courses.id) {
        this.certificadosGeneradosList.push(certificado)
        }
        }
    )
  }





  findById(id: number): void {
    this.cursoService.findById(id).subscribe((response) => {
      this.courses = response;
      console.log("q recupere", this.courses)
    });
  }
  public descarga(id: any) {
    this.certificadoService.descarga(id).subscribe((data) => {
      let dowloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = dowloadURL;
      link.download = 'certificado.pdf';
      link.click();
    });
  }





}
