import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionService } from '../inscription.service';
import { Inscription } from '../inscription';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  constructor(
    private inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  initialForm: Inscription = {
    id: 0,
    userId: 1,
    courseId: 1,
    publicity: {
      id: 0,
      code: "",
      value: ""
    },
    otherCourses: 1,
    sponsoredCourse: false,
    institutionContact: "",
    state: {
      id: 1,
      code: "",
      value: ""
    },
    personCecy: 1
  };

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }
  save(): void {
    console.log(this.initialForm);
    this.inscriptionService.save(this.initialForm).subscribe(() => {
      this.initialForm = {
        id: 0 ,
        userId: 1,
        courseId: 0,
        publicity: {
          id: 0,
          code: "",
          value: ""
        },
        otherCourses: 0,
        sponsoredCourse: false,
        institutionContact: "",
        state: {
          id: 1,
          code: "",
          value: ""
        },
        personCecy: 1
      };
      this.router.navigate(['/cecy/student/courses-list']);
    });
  }

  cancelar(): void {
  }

}

