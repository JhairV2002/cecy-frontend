import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TopicHttpService} from "@services/cecy";
import {TopicModel} from "@models/cecy";
import {FileModel, PaginatorModel} from "@models/core";
import {FormControl} from "@angular/forms";
import { CoreHttpService } from '@services/core';

@Component({
  selector: 'app-topic-course',
  templateUrl: './topic-course.component.html',
  styleUrls: ['./topic-course.component.scss']
})
export class TopicCourseComponent implements OnInit {

  courseId: number;
  topics: TopicModel[] = [];
  cols: any[];

  //files

  public files: FileModel[] = [];
  public pdf: FileModel = {};
  public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private topicHttpService: TopicHttpService,
    public coreHttpService: CoreHttpService,
    private router: Router,
  ) {
    this.courseId = this.activatedRouter.snapshot.params['id'];
    this.cols = [
      { field: 'description', header: 'Tema' },
      { field: 'children.description', header: 'Subtema' },
      { field: 'children.file', header: 'File' },
    ];
  }

  ngOnInit(): void {
    this.loadTopics();
  }
  loadTopics(page: number = 1) {
    console.log(this.courseId);
    this.topicHttpService.getTopics(page, '1', this.courseId).subscribe(
      response => {
        // console.log(response.data);
        this.topics =  response.data;
        // console.log(this.newForm.value)
      }
    );
  }
  loadFiles(id:number) {
    // this.topicId =  this.authService.user.id
    //console.log(this.topicId)
    this.topicHttpService.getFiles(id,this.paginatorFiles, this.filterFiles.value).subscribe(
      (response) => {
        this.files = response.data;
        console.log(this.files);
      }
    )
  }
  downloadFile(file: FileModel) {
      this.coreHttpService.downloadFile(file);
      } 
      redirectCourse() {
        this.router.navigate(['/cecy/student/my-courses']);
      }
    
  }


