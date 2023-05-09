import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColModel, PaginatorModel, CourseModel, PlanificationModel } from '@models/cecy';
import { CatalogueModel, FileModel } from '@models/core';
import { AttendanceHttpService, CatalogueHttpService, PlanificationHttpService, RegistrationHttpService } from '@services/cecy';
import { AuthService, MessageService } from '@services/core';
import { MenuItem } from 'primeng/api';
import { CourseHttpService } from '../../../../../services/cecy/course-http.service';

@Component({
  selector: 'app-course-visualization-list',
  templateUrl: './course-visualization-list.component.html',
  styleUrls: ['./course-visualization-list.component.scss']
})
export class CourseVisualizationListComponent implements OnInit {
  courseVisualizations$ = this.courseHttpService.courses$;
  courseVisualization$ = this.courseHttpService.course$;
  loaded$ = this.courseHttpService.loaded$;
  paginator$ = this.courseHttpService.paginator$;
  courseId: any;
  items: MenuItem[] = [];
  rowData:any;


  selectedCourseVisualizations: CourseModel[] = [];
  selectedCourseVisualization: CourseModel = {};
  cols: ColModel[];
  paginator: PaginatorModel = {};
  courses: CourseModel[] = [];
  public planificationId: any = this.activatedRoute.snapshot.params['id'];
  courseStates: CatalogueModel[] = [];
  planificationStates: CatalogueModel[] = [];
  public formInstructor: FormGroup = this.newFormInstructor;
  dialogForm: boolean = false;
  

  public files: FileModel[] = [];
  public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;
 
 @Output() dialogForms = new EventEmitter<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
    private catalogueHttpService: CatalogueHttpService,
    private courseHttpService: CourseHttpService,
    private planificationHttpService: PlanificationHttpService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    public attendaceHttpService:AttendanceHttpService,
    public registrationHttpService:RegistrationHttpService) {
    this.cols = [
      // { field: 'code', header: 'Código del curso' },
      // { field: 'name', header: 'Nombre del curso' },
      { field: 'state', header: 'Estado del curso' },
      // { field: 'career', header: 'Carrera' },
      // { field: 'responsibleTeacher', header: 'Docente responsable' },
      { field: 'planifications', header: 'Fecha' },
      { field: 'planifications', header: 'Docente responsable del curso' },
      { field: 'planifications', header: 'Estado de la planificación' },
      { field: 'planifications', header: 'Observaciones' },

    ];

    this.items = [
      {
        label: 'Necesidades del curso',
        icon: 'pi pi-download',
        command: () => {
          this.download(this.rowData)
          
        }
        
      },
      {
        label: 'Registro fotografico',
        icon: 'pi pi-download',
        command: () => {
          this.downloadPhotographicRecord(this.rowData)
          
        }
        
      },
      {
        label: 'Registro participantes',
        icon: 'pi pi-download',
        command: () => {
          this.downloadRecordCompetitors(this.rowData)
          
        }
        
      },
      {
        label: 'Asistencia Evaluacion',
        icon: 'pi pi-download',
        command: () => {
          this.download2(this.rowData)
          
        }
        
      },
      {
        label: 'Diseño Curricular',
        icon: 'pi pi-download',
        command: () => {
          this.download3(this.rowData)
          
        }
        
      },
      {
        label: 'Informe Final',
        icon: 'pi pi-download',
        command: () => {
          this.download4(this.rowData)
          
        }
        
      },
      {
        label: '',
        icon: 'pi pi-eye',
        command: () => {
          this.showForm(this.rowData)
          
        }
        
      },
      {
        label: '',
        icon: 'pi pi-file',
        command: () => {
          this.showModalFiles()
          
        }
        
      },
    ];

    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadCourseVisualizations();
    this.loadCourseStates();
    this.loadPlanificationStates();
  }

  select(valor){this.rowData=valor}

  get newFormInstructor():FormGroup{
    return this.formBuilder.group({
      state: [null,[Validators.required]]
    })
  }

  loadCourseVisualizations(page: number = 1) {
    this.courseHttpService.getCoursesByCoordinator(page).subscribe();
  }

  loadPlanificationStates() {
    this.catalogueHttpService.getCatalogues('PLANIFICATION_STATE')
      .subscribe(
        response => {
          this.planificationStates = response.data;
        }, error => {
          this.messageService.error(error);
        }
      );
  }

  loadCourseStates() {
    this.catalogueHttpService.getCatalogues('COURSE_STATE')
      .subscribe(
        response => {
          this.courseStates = response.data;
        }, error => {
          this.messageService.error(error);
        }
      );
  }

  getCoursesByCoordinator() {
    this.courseHttpService.getCoursesByCoordinator(1).subscribe(response => {
      this.courses = response.data;
    })
  }

  Save(courseStates, state){
    this.courseHttpService.updateStateCourse(courseStates.id, state).subscribe(response => {
      //this.courses = response.data;
      this.loadCourseVisualizations();
      this.messageService.success(response);
    })
  }

  SaveStatePlanification(planificationStates, state){
    this.planificationHttpService.updateStatePlanification(planificationStates.id, state).subscribe(response => {
      //this.courses = response.data;
      this.loadCourseVisualizations();
      this.messageService.success(response);
    })
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadCourseVisualizations(this.paginator.current_page);
  }

  showForm(course: CourseModel = {}) {
    console.log(this.selectedCourseVisualization = course)
    this.selectedCourseVisualization = course;
    this.courseHttpService.selectCourse(course);
    this.dialogForm = true;
  }

  loadFiles() {
    this.courseId =  this.authService.user.id
    console.log(this.courseId)
    this.planificationHttpService.getFiles(this.courseId,this.paginatorFiles, this.filterFiles.value).subscribe(
      (response) => {
        this.files = response.data;
      }
    )
  }
  
  uploadFiles(event: any) {
    this.courseId =  this.authService.user.id
    const formData = new FormData();
    for (const file of event) {
      formData.append('files[]', file);
    }
  
    this.planificationHttpService.uploadFiles(this.courseId, formData).subscribe(response => {
      // this.getPayments();
      this.messageService.success(response);
    });
  }

  showModalFiles() {
    this.loadFiles();
    this.displayModalFiles = true;
  }

  get stateField(){
    return this.formInstructor.controls['state'];
  }

  download(course: CourseModel){
    this.courseHttpService.downloadReportNeed(course.id);
  }
  downloadRecordCompetitors(planification:PlanificationModel){
    this.registrationHttpService.downloadReportRecordCompetitors(planification.id);

  }

  downloadPhotographicRecord(course: CourseModel){
    this.attendaceHttpService.downloadPhotographicRecord(course.id);

  }
  download2(course: CourseModel){
    this.attendaceHttpService.downloadatendanceEvaluation(course.id);
   // console.log (course);

  }
  
  download3(planification: PlanificationModel){
    this.planificationHttpService.downloadcurricularDesign(planification.id);
  }
    download4(planification: PlanificationModel){
      this.planificationHttpService.downloadinformeFinal(planification.id);
  }
}
