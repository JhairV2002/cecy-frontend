import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { ActivatedRoute } from '@angular/router';
import {
  CommentsService,
  PlanificationCareerService,
} from '@services/cecy/coordinator-cecy';
import { MessageService } from '@services/core';
import { MessageService as MessagePrime } from 'primeng/api';
import { PlanificationCourse } from '@models/cecy';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() openModal: boolean = false;
  @Input() planification: PlanificationCourse | null = null;
  @Output() clickClose = new EventEmitter<boolean>();
  formComment = this.fb.group({
    comments: ['', [Validators.required]],
  });
  loading$ =
    this.planificationsCoursesService.loading$ || this.commentService.loading$;

  constructor(
    private fb: FormBuilder,
    private planificationsCoursesService: PlanificationsCoursesService,
    private activatedRoute: ActivatedRoute,
    private planificationCareerService: PlanificationCareerService,
    public messageService: MessageService,
    private messagePrime: MessagePrime,
    private commentService: CommentsService
  ) {}
  ngOnInit(): void {}
  closeModal() {
    this.clickClose.emit(false);
  }

  onSubmit() {
    if (this.formComment.valid) {
      this.saveCommentAndSuspendePlanification();
    } else {
      this.formComment.markAllAsTouched();
    }
  }

  saveCommentAndSuspendePlanification() {
    const valuesForm = this.formComment.value.comments;
    const comments = {
      comments: valuesForm,
      planificationId: this.planification?.id,
    };
    console.log('Enviando comentario al usuario', valuesForm);
    this.commentService
      .createComment(comments)
      .pipe(switchMap(async () => this.suspendPlanification()))
      .subscribe({
        next: (data) => {
          console.log('QUE ME LLEGA AQUI', data);
        },
        error: (error) => {
          this.clickClose.emit(false);
          this.messageService.error(error);
        },
      });
  }

  suspendPlanification() {
    const id = this.activatedRoute.snapshot.params['id'];
    const isPlanificationApproved = this.planification;
    this.planification?.state === 'aprobado' || 'creado';
    console.log('Planificacio', isPlanificationApproved);
    if (isPlanificationApproved) {
      const state = 'suspendido';
      this.planificationCareerService.updatePlanification(id, state).subscribe({
        next: (data) => {
          console.log('El estado se actualizo', data);
          this.clickClose.emit(false);
          this.messageService.suspendPlanification(data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (error) => {
          this.clickClose.emit(false);
          this.messageService.error(error);
          console.log(error);
        },
      });
    } else {
      console.log('La planificación no está aprobada');
      this.messagePrime.add({
        severity: 'info',
        summary: 'No Aprobado',
        detail:
          'La planificación debe estar aprobada o creado para poder suspenderla',
      });
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get commentField() {
    return this.formComment.controls['comments'];
  }
}
