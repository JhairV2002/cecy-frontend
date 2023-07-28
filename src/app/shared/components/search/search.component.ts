import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { MessageService } from '@services/core';
import { ColModel } from '@models/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() cols: ColModel[] = [];
  @Input() records: any[] = [];
  @Input() paginatorIn: any = {
    current_page: 1,
    per_page: 5,
    total: 0,
  };
  @Input() loading: boolean = false;
  @Output() selectedRecordOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() displayModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() paginatorOut: EventEmitter<any> =
    new EventEmitter<any>();
  items: MenuItem[] = [];
  filter: FormControl;
  progressBarDelete: boolean = false;
  selectedRecord: any = null;

  constructor(public messageService: MessageService) {
    this.filter = new FormControl(null);
  }

  ngOnInit(): void {}

  select(record: any) {
    this.selectedRecordOut.emit(record);
    this.displayModal.emit(false);
  }

  paginate(event: any) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }
}
