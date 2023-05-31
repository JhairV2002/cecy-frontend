import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { CourseModel, InstructorModel } from '@models/cecy';
import { CatalogueModel, ColModel, PaginatorModel, UserModel } from '@models/core';
import { CatalogueHttpService } from '@services/cecy';
import { InstructorHttpService } from '@services/cecy/instructor-http.service';
import { MessageService, UserAdministrationHttpService } from '@services/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-assignmented-instructor',
  templateUrl: './assignmented-instructor.component.html',
  styleUrls: ['./assignmented-instructor.component.scss']
})
export class AssignmentedInstructorComponent {

  instructors$ = this.instructorHttpService.instructors$;
  instructor$ = this.instructorHttpService.instructors$;
  loaded$ = this.instructorHttpService.loaded$;
  paginator$ = this.instructorHttpService.paginator$;
  public instructorTypes: CatalogueModel [] = [];
  public formInstructor: FormGroup = this.newFormInstructor;

  selectedInstructors: InstructorModel[] = [];
  selectedType: any;
  selectedInstructor: InstructorModel[] = [];
  InstructorModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  progressBarDelete: boolean = false;
  paginator: PaginatorModel = {};
  courses: CourseModel[] = [];
  search: FormControl = new FormControl('');
  public planificationId: any = this.activatedRoute.snapshot.params['id'];

  constructor(private activatedRoute: ActivatedRoute,
    private instructorHttpService: InstructorHttpService,
    private catalogueHttpService: CatalogueHttpService,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private router:Router) {
    this.cols = [
      {field: 'username', header: 'Cédula'},
      {field: 'name', header: 'Nombres'},
      {field: 'lastname', header: 'Apellidos'},
      {field: 'email', header: 'Correo'},
      {field: 'type', header: 'Tipo de Instructor'},
    ];
    
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadInstructors();
    this.loadInstructorTypes();
  }

  get newFormInstructor():FormGroup{
    return this.formBuilder.group({
      instructorType: [null,[Validators.required]]
    })
  }

  loadInstructors(page: number = 1) {
    this.instructors$ = this.instructorHttpService.getInstructors(page, this.search.value);
  }

  loadInstructorTypes(page: number = 1) {
   this.catalogueHttpService.getCatalogues('INSTRUCTOR').subscribe(
     response =>{
       this.instructorTypes = response.data;
      //console.log (this.instructorTypes)
     }, error => {
       this.messageService.error(error)
     }
   )
  }

  deleteInstructor(instructor: InstructorModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.instructorHttpService.deleteInstructor(instructor.id!).subscribe(
            response => {
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }

  deleteInstructors(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedInstructors.map(element => element.id);
          this.progressBarDelete = true;
          this.instructorHttpService.deleteInstructors(ids).subscribe(
            response => {
              this.progressBarDelete = false;
              this.messageService.success(response);
            },
            error => {
              this.progressBarDelete = false;
              this.messageService.error(error);
            }
          );
        }
      });

  }


  updateInstructor(instructor: InstructorModel): void {
    let entregar=instructor;
    entregar.type=this.selectedType;
    this.instructorHttpService.updateInstructor(instructor.id!, entregar)
      .subscribe({
        next: response => {
          this.messageService.success(response);
          // this.dialogForm.emit(false);
        }, error: error => {
          this.messageService.error(error);
        }
      });
  } 

  changeState() {

  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadInstructors(1);
    }
  }
  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadInstructors(this.paginator.current_page);
  }

  redirect(){
    this.router.navigate(['/cecy/coordinator-cecy/assignmented-instructor']);
  }
 
  get instructorTypeField(){
    return this.formInstructor.controls['instructorType']
  }

}
