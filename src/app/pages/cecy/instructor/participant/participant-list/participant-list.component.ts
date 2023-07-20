import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { ColModel, PaginatorModel } from '@models/core';
import { ParticipantHttpService } from '@services/cecy';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  participants$ = this.participantHttpService.participants$;
  participant$ = this.participantHttpService.participant$;
  loaded$ = this.participantHttpService.loaded$;
  paginator$ = this.participantHttpService.paginator$;

  selectedParticipants: any[] = [];
  selectedParticipant: any = {};
  cols: ColModel[]; // conditional
  items: MenuItem[] = []; // optional
  dialogForm: boolean = false; // optional
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};

  constructor(private participantHttpService: ParticipantHttpService,
    public messageService: MessageService) {
    this.cols = [
      { field: 'id', header: 'N° Lista' },
      { field: 'user', header: 'Identificacion' },
      { field: 'user', header: 'Apellidos y Nombres' },
      { field: 'type', header: 'Tipo de Usuario' },
      { field: 'state', header: 'Estado' },
    ];
    this.items = [
      /*{
        label: 'Cambiar Contraseña',
        icon: 'pi pi-key',
        command: () => {
          this.changePassword();
        }
      },*/
      {
        label: 'Eliminar Participante',
        icon: 'pi pi-participant-minus',
        command: () => {
          this.deleteParticipant(this.selectedParticipant);
        }
      },
      {
        label: 'Aceptar Participante',
        icon: 'pi pi-id-card',
        command: () => {
          this.acceptParticipant(this.selectedParticipant);
        }
      },
      {
        label: 'Rechazar Participante',
        icon: 'pi pi-id-card',
        command: () => {
          this.declineParticipant(this.selectedParticipant);
        }
      },
      /*/{
        label: 'Cambiar Permisos',
        icon: 'pi pi-sitemap',
        command: () => {
          this.changePassword();
        }
      }*/
    ];
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(page: number = 1) {
    this.participants$ = this.participantHttpService.getParticipants(page, this.search.value);
  }

  // optional
  showForm(participant: any = {}) {
    this.selectedParticipant = participant;
    this.participantHttpService.selectParticipant(participant);
    this.dialogForm = true;
  }

  selectParticipant(participant: any) {
    this.selectedParticipant = participant;
  }

  acceptParticipant(participant: any): void {
    console.log(this.selectedParticipant);

    this.messageService.questionAcceptParticipant({})
      .then((result) => {
        if (result.isConfirmed) {
          this.participantHttpService.updateParticipantState(participant.id!)
            .subscribe(
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

  declineParticipant(participant: any): void {
    console.log(this.selectedParticipant);
    this.messageService.questionDeclineParticipant({})
      .then((result) => {
        if (result.isConfirmed) {
          this.participantHttpService.declineParticipant(participant.id!)
            .subscribe(
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

  deleteParticipant(participant: any): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.participantHttpService.deleteParticipant(participant.id!)
            .subscribe(
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

  deleteParticipants(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedParticipants.map(element => element.id);
          this.progressBarDelete = true;
          this.participantHttpService.deleteUsers(ids).subscribe(
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

  changePassword() {

  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadParticipants(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadParticipants(this.paginator.current_page);
  }
}
