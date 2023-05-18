import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { PaginatorModel, ServerResponse } from '@models/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';
import { LoginResponse } from '@models/core/login.response';
import { Message } from 'primeng/api';
import { MessageService as MessagePNService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private messageService: MessagePNService,
    private router: Router
  ) {}

  errorValid(error:HttpErrorResponse){
    console.log(error, 'message');
    return Swal.fire({
      title: 'Ups algo salio mal!',
      text: error.error.message,
      icon: 'error',
    });
  }

  error(error: HttpErrorResponse) {
    if (error.status === 401) {
      return Swal.fire({
        title: 'Usuario no autorizado',
        text: error.error.message,
        icon: 'error',
      });
    }
    if (error.status === 400) {
      if (error.error.msg.code === '23505') {
        return Swal.fire({
          title: 'El registro ya existe',
          text: error.error.data,
          icon: 'error',
        });
      }
    }
    if (error.status === 404) {
      return Swal.fire({
        title: error.error.msg.summary,
        text: error.error.msg.detail,
        icon: 'warning',
      });
    }
    if (error.status === 422) {
      let i;
      const fields = Object.values(error.error.msg.detail)
        .toString()
        .split('.,');
      let html = '<ul>';
      for (i = 0; i < fields.length - 1; i++) {
        html += `<li>${fields[i]}.</li>`;
      }
      html += `<li>${fields[i]}</li>`;
      html += '</ul>';
      return Swal.fire({
        title: error.error.msg.summary,
        html,
        icon: 'error',
      });
    }

    return Swal.fire({
      title: error.error?.msg?.summary,
      text: error.error?.msg?.detail,
      icon: 'error',
    });
  }



  successRecovery(serverResponse: ServerResponse) {
    console.log(serverResponse, 'message');
    return Swal.fire({
      title:'Actualización exitosa' ,
      text:  serverResponse.message,
      icon: 'success',
    });
  }

  succesAproveedCourse(serverResponse: ServerResponse){
    console.log(serverResponse, 'message');
    return Swal.fire({
      title: 'Fue aprobado el curso con éxito' ,
      text:  serverResponse.message,
      icon: 'success',
    });
  }

  success(serverResponse: ServerResponse | LoginResponse | undefined) {
    console.log(serverResponse, 'message');
    return Swal.fire({
      title: serverResponse?.msg?.summary,
      text: serverResponse?.msg?.detail,
      icon: 'info',
    });
  }

  successUser(serverResponse: ServerResponse) {
    return Swal.fire({
      title: serverResponse.message,
      text: serverResponse?.msg?.detail,
      icon: 'success',
    });
  }

  successCourse(serverResponse: any) {
    console.log(serverResponse);
    return Swal.fire({
      title: serverResponse.message,
      //text: serverResponse?.msg?.detail,
      icon: 'success',
    });
  }

  successPlanification(serverResponse: ServerResponse) {
    return Swal.fire({
      title: serverResponse.message,
      //text: serverResponse?.msg?.detail,
      icon: 'success',
    });
  }

  successEmail(serverResponse: ServerResponse | LoginResponse | undefined) {
    console.log(serverResponse, 'message');
    return Swal.fire({
      title: 'Correo enviado',
      text: 'Correo de recuperación fue enviado correctamente',
      icon: 'info',
    });
  }

  finishTest() {
    return Swal.fire({
      title: 'Gracias por participar!',
      text: 'Se enviará un correo electrónico con los resultados',
      icon: 'info',
    });
  }

  showLoading() {
    return Swal.showLoading();
  }

  hideLoading() {
    return Swal.hideLoading();
  }

  errorRequired() {
    this.messageService.add({
      severity: 'error',
      summary: 'No se puede eliminar',
      detail: 'El campo es requerido',
    });
  }

  questionDeleteUser({
    title = '¿Está seguro de eliminar este usuario?',
    text = 'No podrá recuperar esta información!',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '<i class="pi pi-trash"> Si, eliminar</i>',
    });
  }

  questionDeletePlanificationCourse({
    title = '¿Está seguro de eliminar está planificación?',
    text = 'No podrá recuperar esta información!',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '<i class="pi pi-trash"> Si, eliminar</i>',
    });
  }

  questionDelete({
    title = '¿Está seguro de eliminar?',
    text = 'No podrá recuperar esta información!',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '<i class="pi pi-trash"> Si, eliminar</i>',
    });
  }

  questionReenroll({
    title = '¿Está seguro de rematricular al participante?',
    text = 'El estado del participante cambiara directamente a matriculado!',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d39',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-trash"> Si, Rematricular</i>',
    });
  }

  questionNullify({
    title = '¿Está seguro de anular al participante?',
    text = 'La matrícula anulada cambiara su estado a cancelado',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d39',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-trash"> Si, Anular</i>',
    });
  }

  questionDeclineCourse({
    title = '¿Está seguro de rechazar el curso?',
    text = 'No podrá recuperar esta información!',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-trash"> Si rechazar</i>',
    });
  }

  questionDeclineParticipant({
    title = '¿Está seguro de rechazar participante?',
    text = '',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-trash"> Si rechazar</i>',
    });
  }

  questionAcceptParticipant({
    title = '¿Está seguro de aceptar al participante?',
    text = '',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-trash"> Si rechazar</i>',
    });
  }

  questionOnExit({
    title = '¿Está seguro de salir?',
    text = 'Se perderá la información que no haya guardado!',
  }) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-sign-out"> Si, salir</i>',
    });
  }

  deny() {
    return Swal.fire({
      title: 'No Permitido',
      text: 'No le pertenece esta planificación',
      icon: 'error',
    });
  }

  get fieldRequired(): string {
    return 'El campo es obligatorio.';
  }

  get fieldEmail(): string {
    return 'Correo electrónico no válido.';
  }

  get fieldWeb(): string {
    return 'Página web no válida.';
  }

  get fieldNumber(): string {
    return 'El campo solo debe contener numeros.';
  }

  fieldMinLength(errors: ValidationErrors) {
    return `Debe contener como mínimo de caracteres ${errors['minlength']['requiredLength']}.`;
  }

  fieldMaxLength(errors: ValidationErrors): string {
    return `Debe contener como máximo de caracteres ${errors['maxlength']['requiredLength']}.`;
  }

  fieldMin(errors: ValidationErrors) {
    return `Numero mínimo permitido es ${errors['min']['requiredMin']}.`;
  }

  fieldMax(errors: ValidationErrors): string {
    return `Numero maximo permitido es ${errors['max']['requiredMax']}.`;
  }

  get fieldPattern() {
    return `No cumple con el formato.`;
  }

  get fieldIdentification() {
    return `No cumple con el formato de una cédula Ecuatoriana.`;
  }

  get fieldNoPasswordMatch(): string {
    return 'Las contraseñas no coinciden.';
  }

  get fieldUserNotAvailable(): string {
    return 'Este usuario ya se encuentra registrado.';
  }

  get fieldEmailNotAvailable(): string {
    return 'Este correo electrónico no está disponible.';
  }

  get fieldPhoneNotAvailable(): string {
    return 'Este teléfono no está disponible.';
  }

  paginatorTotalRegisters(paginator: PaginatorModel): string {
    return (
      'En total hay ' + (paginator?.total ? paginator.total : 0) + ' registros.'
    );
  }

  get paginatorNoRecordsFound(): string {
    return 'No se encontraron registros.';
  }

  get buttonFormSaveOrUpdate(): string {
    return `Guardar`;
  }

  get buttonFormClose(): string {
    return `Cerrar`;
  }

  get progressBarProcess(): string {
    return `Procesando...`;
  }

  get progressBarSaveOrUpdate(): string {
    return `Guardando...`;
  }

  get progressBarDownload(): string {
    return `Descargando...`;
  }

  get progressBarUpload(): string {
    return `Cargando...`;
  }

  get progressBarLogin(): string {
    return `Ingresando...`;
  }

  get progressBarRequestPasswordReset(): string {
    return `Enviando correo...`;
  }

  get progressBarDelete(): string {
    return `Eliminando...`;
  }

  get messagesDelete(): Message[] {
    return [
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Message Content',
      },
    ];
  }

  get messageSuccessDelete(): string {
    return `Se eliminó correctamente`;
  }
}