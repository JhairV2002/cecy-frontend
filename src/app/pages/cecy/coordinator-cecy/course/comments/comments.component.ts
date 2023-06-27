import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() openModal: boolean = false;
  @Output() clickClose = new EventEmitter<boolean>();

  progressBar: boolean = false;
  formComment = this.fb.group({
    comment: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
  closeModal() {
    this.clickClose.emit(false);
  }

  onSubmit() {
    if (this.formComment.valid) {
      this.saveComment();
    } else {
      this.formComment.markAllAsTouched();
    }
  }

  saveComment() {
    this.progressBar = true;
    console.log('Enviando comentario al usuario');
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get commentField() {
    return this.formComment.controls['comment'];
  }
}
