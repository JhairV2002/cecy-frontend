import { CourseService } from '@services/cecy-v1/course.service';
import { Subject, takeUntil } from 'rxjs';
import { PaginatorModel, TopicModel } from '@models/cecy';
import { MessageService } from '@services/core/message.service';
import { TopicHttpService } from '@services/cecy/topic-http.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Topic } from '@models/cecy-v1/topic.model';
import { ActivatedRoute } from '@angular/router';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  idTopicEdit: TopicModel | undefined;
  topics: Topic[] = [];

  selectedTopic: TopicModel = {};
  dialogForm: boolean = false; // optional
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  courseId: number = 0;

  public progressBar: boolean = false;
  public newForm: FormGroup = this.newFormTopics;
  selectedCourse: any;

  constructor(
    private topicHttpService: TopicHttpService,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private planificationCourseService: PlanificationsCoursesService
  ) {
    // this.getPlanificationById();
  }

  ngOnInit(): void {
    this.getPlanificationById();
  }

  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.planificationCourseService
        .planificationById(id)
        .subscribe((data) => {
          this.selectedCourse = data;
          this.courseId = this.selectedCourse.course.id;
          this.loadTopics();
        });
    }
  }

  get newFormTopics(): FormGroup {
    return this.formBuilder.group({
      description: [null, [Validators.required]],
      children: this.formBuilder.array([]),
    });
  }

  editTopic(topic: TopicModel = {}) {
    if (topic.id !== undefined) {
      this.newForm.reset(topic);
      const nameChildrens = topic.children?.map((x) => x.description);
      nameChildrens?.forEach((e: any) => {
        this.addSubtopic(e);
      });
      this.idTopicEdit = topic;
      console.log(this.idTopicEdit);
      this.dialogForm = true;
    }
  }
  addSubtopic(subtopic = '') {
    this.childrenField.push(this.formBuilder.control(subtopic));
  }

  storeTopic(topics: Topic[]): void {
    this.progressBar = true;
    this.courseService
      .saveTopics(this.courseId, topics)
      .subscribe((response) => {
        this.loadTopics();
        this.progressBar = false;
      });
  }

  updateTopic(topic: TopicModel[]): void {
    this.progressBar = true;
    this.topicHttpService.updateTopics(topic, 1).subscribe(
      (response) => {
        this.messageService.success(response);
        this.progressBar = false;
      },
      (error) => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

  onSubmit() {
    console.log('topics', this.newForm.value);

    if (this.idTopicEdit) {
      console.log('detro if', this.idTopicEdit);
      this.courseService
        .deleteTopic(this.idTopicEdit.id)
        .subscribe((response) => {
          this.loadTopics();
        });
      this.storeTopic(this.newForm.value);
      this.childrenField.clear();
      this.newForm.reset();
    } else {
      this.storeTopic(this.newForm.value);
      this.childrenField.clear();
      this.newForm.reset();
    }
    this.dialogForm = false;
  }

  deleteTopicForm(index: number) {
    if (this.childrenField.length >= 1) {
      this.childrenField.removeAt(index);
    } else {
      this.childrenField.markAllAsTouched();
      this.messageService.errorRequired();
    }
  }

  loadTopics(page: number = 1) {
    this.courseService
      .getTopics(this.selectedCourse?.course.id)
      .subscribe((response) => {
        this.topics = response;
      });
  }

  selectTopic(topic: TopicModel) {
    this.selectedTopic = topic;
  }

  // deleteTopic(topicId: TopicModel): void {
  //   this.messageService.questionDelete({})
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         // this.topicHttpService.destroyTopic(topicId.id, this.courseId).subscribe(
  //         //   response => {
  //         //     this.messageService.success(response);
  //         //     this.loadTopics()
  //         //   },
  //         //   error => {
  //         //     this.messageService.error(error);
  //         //   }
  //         // );
  //         this.courseService.deleteTopic(this.editTopic).subscribe()
  //       }
  //     });
  // }
  deleteTopicById(topicId: any): void {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteTopic(topicId).subscribe((response) => {
          this.loadTopics();
        });
        this.loadTopics();
      }
    });
  }
  deleteSubTopicById(subtopicId: any): void {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteSubTopic(subtopicId).subscribe((response) => {
          this.loadTopics();
        });
      }
    });
  }

  showForm() {
    this.dialogForm = true;
  }

  hideDialog() {
    this.childrenField.clear();
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadTopics();
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadTopics(this.paginator.current_page);
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get descriptionField() {
    return this.newForm.controls['description'];
  }
  get childrenField(): FormArray {
    return this.newForm.controls['children'] as FormArray;
  }
}
