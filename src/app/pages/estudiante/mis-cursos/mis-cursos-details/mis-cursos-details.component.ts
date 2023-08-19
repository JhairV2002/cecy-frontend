import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { CursosService } from '@services/cecy/cursos';
import { PlanificationCourse } from '@models/cecy';
import { Observable, map } from 'rxjs';
import { CertificateRequestService } from 'src/app/pages/cecy/assistant/solicitud-certificado/certificate-request.service';
import { Codes } from 'src/app/pages/cecy/assistant/solicitud-certificado/certificate';

@Component({
  selector: 'app-mis-cursos-details',
  templateUrl: './mis-cursos-details.component.html',
  styleUrls: ['./mis-cursos-details.component.css'],
})
export class MisCursosDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private certificadoService: CertificateRequestService
  ) {}

  matricula!: Matricula;

  curso!: Observable<PlanificationCourse>;

  codigo: Codes | null = null;

  ngOnInit() {
    this.matricula = history.state;
    this.curso = this.cursosService
      .getCursoById(this.matricula.cursoId)
      .pipe(map((res) => res.planification));

    this.certificadoService
      .findByMatriculaId(this.matricula.id!)
      .subscribe((res) => {
        this.codigo = res;
        console.log('certificado', this.codigo);
      });
  }

  descargarCertificado() {
    this.certificadoService
      .downloadCertificate(this.codigo?.id!)
      .subscribe((data) => {
        let dowloadURL = window.URL.createObjectURL(data);
        let link = document.createElement('a');
        link.href = dowloadURL;
        link.download = 'certificado.pdf';
        link.click();
      });
  }
}
