import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscription } from '@models/cecy';
import { InscriptionService } from '@services/cecy';
import { AuthService, TokenService } from '@services/auth';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  constructor(
    private inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  user:any;

  ngOnInit(): void {
    this.authService.getProfile().subscribe((data: any) => {
      this.user = data[0];
      console.log('id User', data[0])
    });
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        if (params.get("id")){
          this.findById(parseInt(params.get("id")!));
        }
      }
    )
  }

  initialForm: Inscription = {
    id: 0,
    userId: 0 ,
    courseId: 1,
    publicity: {
      id: 0,
      nombre: "",
      descripcion: ""
    },
    otherCourses: "",
    sponsoredCourse: false,
    institutionContact: "",
    state: {
      id: 1,
      nombre: "",
      descripcion: ""
    },
  };
  save(): void {
    console.log(this.initialForm);
    console.log('id User', this.user.id)
    const id = this.user.id
    this.inscriptionService.save(this.initialForm).subscribe(() => {
      this.initialForm = {
        id: 0,
        userId: id ,
        courseId: 1,
        publicity: {
          id: 0,
          nombre: "",
          descripcion: ""
        },
        otherCourses: "",
        sponsoredCourse: false,
        institutionContact: "",
        state: {
          id: 1,
          nombre: "",
          descripcion: ""
        },
      };
      this.router.navigate(['/cecy/student/courses-list']);
    });
  }

  findById(id: number):void {
    this.inscriptionService.findByid(id).subscribe(
      (response) => {
        this.initialForm = response;
      }
    )
  }

  cancelar(): void {
  }

}

