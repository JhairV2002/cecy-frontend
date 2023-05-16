import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit{
  @Input() entityName: String = "";
  @Output() termEmitter = new EventEmitter<string>();

  ngOnInit(): void {
    
  }

  public onInput(term: string){
    this.termEmitter.emit(term);
  }
}
