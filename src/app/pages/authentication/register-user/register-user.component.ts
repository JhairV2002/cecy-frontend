import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documents, Institution, PersonCecy } from '@models/cecy';
import {
  DocumentsService,
  InscriptionService,
  InstitutionService,
  RegistrationService,
} from '@services/cecy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  constructor(
    private router: Router,
    public registrationService: RegistrationService,
    public institutionService: InstitutionService,
    public documentsService: DocumentsService
  ) {}
  initialForm: PersonCecy = {
    id: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    fechaNacimiento: new Date(),
    direccion: '',
    numeroConvencional: '',
    numeroCelular: '',
    email: '',
    genero: {
      id: 0,
      nombre: '',
      descripcion: '',
    },
    empresaId: {
      id: 0,
      nombre: '',
      direccion: '',
      email: '',
      numeroCelular: '',
      numeroConvencional: '',
      actividad: '',
    },
    etnia: {
      id: 0,
      nombre: '',
      descripcion: '',
    },
    discapacidad: false,
    detallesDiscapacidad: '',
    tipoEstudiante: {
      id: 0,
      nombre: '',
      descripcion: '',
    },
    nivelInstruccion: {
      id: 0,
      nombre: '',
      descripcion: '',
    },
    situacionEconomica: {
      id: 0,
      nombre: '',
      descripcion: '',
    },
    estado: true,
  };

  enterpriseForm: Institution = {
    id: 0,
    nombre: '',
    direccion: '',
    numeroConvencional: '',
    numeroCelular: '',
    email: '',
    actividad: '',
  };

  prerequisite: Documents = {
    id: 0,
    nombre: 'cedula',
    urlArchivo: '',
    fechaSubida: new Date(),
  };

  ngOnInit(): void {}

  saveUser(): void {
    console.log(this.initialForm);
    this.registrationService.save(this.initialForm).subscribe(() => {
      this.initialForm = {
        id: 0,
        nombres: '',
        apellidos: '',
        cedula: '',
        fechaNacimiento: new Date(),
        direccion: '',
        numeroConvencional: '',
        numeroCelular: '',
        email: '',
        genero: {
          id: 0,
          nombre: '',
          descripcion: '',
        },
        empresaId: {
          id: 0,
          nombre: '',
          direccion: '',
          email: '',
          numeroCelular: '',
          numeroConvencional: '',
          actividad: '',
        },
        etnia: {
          id: 0,
          nombre: '',
          descripcion: '',
        },
        discapacidad: false,
        detallesDiscapacidad: '',
        tipoEstudiante: {
          id: 0,
          nombre: '',
          descripcion: '',
        },
        nivelInstruccion: {
          id: 0,
          nombre: '',
          descripcion: '',
        },
        situacionEconomica: {
          id: 0,
          nombre: '',
          descripcion: '',
        },
        estado: false,
      };
      this.router.navigate(['/login']);
    });
  }
  saveInstitution(): void {
    console.log(this.enterpriseForm);
    this.institutionService.save(this.enterpriseForm).subscribe(() => {
      this.enterpriseForm = {
        id: 0,
        nombre: '',
        direccion: '',
        numeroConvencional: '',
        numeroCelular: '',
        email: '',
        actividad: '',
      };
    });
  }
}
