import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPlanificationModel } from '@models/cecy';
import { FileModel, PaginatorModel, UserModel } from '@models/core';
import { DetailPlanificationHttpService } from '@services/cecy';
import { AuthHttpService, AuthService, MessageService } from '@services/core';

@Component({
  selector: 'app-participant-course',
  templateUrl: './participant-course.component.html',
  styleUrls: ['./participant-course.component.scss']
})
export class ParticipantCourseComponent implements OnInit {

  detailPlanificationId:any;
  dialogForm: boolean = false; // optional
  display: boolean = false;
  userId: any;

  //files

  public files: FileModel[] = [];
  public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public messageService: MessageService,
    ) {
      this.detailPlanificationId = this.activatedRouter.snapshot.params['id'];
   }

  ngOnInit(): void {

  }
}
