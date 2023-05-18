import { CourseService } from './../../../../../services/cecy-v1/course.service';
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
} from '@angular/core';
import { Topic } from '@models/cecy-v1/topic.model';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit, OnDestroy {
  topics$ = this.topicHttpService.topics$;
  topic$ = this.topicHttpService.topic$;
  loaded$ = this.topicHttpService.loaded$;
  paginator$ = this.topicHttpService.paginator$;
  idTopicEdit: any;
  // topics: TopicModel[] = [];
  topics: Topic[] = [];

  selectedTopic: TopicModel = {};
  dialogForm: boolean = false; // optional
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  @Input() courseId: number = 0;

  public progressBar: boolean = false;
  private unsubscribe$ = new Subject<void>();
  public newForm: FormGroup = this.newFormTopics;

  constructor(
    private topicHttpService: TopicHttpService,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.paginator$.subscribe((response) => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadTopics();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormTopics(): FormGroup {
    return this.formBuilder.group({
      description: [null, [Validators.required]],
      children: this.formBuilder.array([]),
    });
  }

  editTopic(topic: TopicModel = {}) {
    if (topic.id !== undefined) {
      // this.newForm.reset(topic);
      // const nameChildrens = topic.children.map((x) => x.description);
      // nameChildrens.forEach((e) => {
      //   this.addSubtopic(e);
      // });
      // this.idTopicEdit = topic;
      // console.log(this.idTopicEdit);
      // this.dialogForm = true;
    }
  }
  addSubtopic(subtopic = '') {
    this.childrenField.push(this.formBuilder.control(subtopic));
  }

  storeTopic(topics: Topic[]): void {
    this.progressBar = true;
    // this.topicHttpService.storeTopic(topics, this.courseId).subscribe(
    //   response => {
    //     if (!this.idTopicEdit) {
    //       this.messageService.success(response);
    //     } else {
    //       response.msg = {
    //         summary: "Tema y subtema Actualizado",
    //         detail: "",
    //         code: "200"
    //       }
    //       this.messageService.success(response);
    //     }
    //     this.loadTopics()
    //     this.progressBar = false;
    //   },
    //   error => {
    //     this.messageService.error(error);
    //     this.progressBar = false;
    //   }
    // );
    console.log('thats is send', topics);
    this.courseService
      .saveTopics(this.courseId, topics)
      .subscribe((response) => {
        this.loadTopics();
        console.log(response);
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
    // if (this.newForm.valid) {
    //   const formDataChildren = []
    //   const data = []
    //   this.newForm.value.children.forEach(x => {
    //     formDataChildren.push({ description: x})
    //   })
    //   this.newForm.value.children = formDataChildren
    //   data.push(this.newForm.value)
    //   if (this.idTopicEdit) {
    //     this.topicHttpService.destroyTopic(this.idTopicEdit.id, this.courseId).subscribe(
    //       response => {this.loadTopics()},error => {}
    //     );
    //     this.storeTopic(data);
    //     this.childrenField.clear()
    //     this.newForm.reset()
    //   } else {
    //     this.storeTopic(data);
    //     this.newForm.reset()
    //   }
    //   this.dialogForm = false;
    // } else {
    //   this.newForm.markAllAsTouched();
    // }
    // console.log('formulario',this.newForm.value)

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
    // this.topicHttpService.getTopics(page, this.search.value, this.courseId).subscribe(
    //   response => {
    //     this.topics = response.data
    //   }, error => {
    //     this.messageService.error(error);
    //   }
    // );

    this.courseService.getTopics(this.courseId).subscribe((res) => {
      this.topics = res;
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
