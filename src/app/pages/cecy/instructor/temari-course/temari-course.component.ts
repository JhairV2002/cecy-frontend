import {Component ,OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicModel} from '@models/cecy';
import {FileModel, PaginatorModel} from "@models/core";
import { TopicHttpService } from '@services/cecy';
import {  MessageService } from '@services/core';

@Component({
  selector: 'app-topic-course',
  templateUrl: './temari-course.component.html',
  styleUrls: ['./temari-course.component.scss']
})
export class TemariCourseComponent implements OnInit {

  topics: TopicModel[] = [];
  selectedTopics: TopicModel = {};
  dialogForms: boolean = false; // optional

   //files

   public files: FileModel[] = [];
   public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
   public filterFiles: FormControl = new FormControl();
   public displayModalFiles: boolean = false;
   public loadingUploadFiles: boolean = false;
   public loadingFiles: boolean = false;

   cols: any[];
   selectedTopic: number;

   courseId: number;

  constructor(
    private topicHttpService: TopicHttpService,
    public messageService: MessageService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.courseId = this.activatedRouter.snapshot.params['id'];
    this.cols = [
      { field: 'description', header: 'Tema' },
      { field: 'children.description', header: 'Subtema' },
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
loadFiles() {
  // this.topicId =  this.authService.user.id
  //console.log(this.topicId)
  this.topicHttpService.getFiles(this.selectedTopic,this.paginatorFiles, this.filterFiles.value).subscribe(
    (response) => {
      this.files = response.data;
    }
  )
}

uploadFiles(event: any) {
  // this.topicId =  this.authService.user.id
  const formData = new FormData();
  for (const file of event) {
    formData.append('files[]', file);
  }
  this.topicHttpService.uploadFiles(this.selectedTopic, formData).subscribe(response => {
    // this.getPayments();
    this.messageService.success(response);
  });
}
showForm(children: number){
  this.selectedTopic =  children;
 // this.topicHttpService.selectTopic(children)
  this.dialogForms = true;
  this.loadFiles();
  // console.log(this.selectedTopic)
}
selectCourse(topic: TopicModel){
  this.selectedTopics =  topic;
}
redirectCourse() {
    this.router.navigate(['/cecy/instructor/courses']);
  }

}
