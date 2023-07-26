import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificateRequestService } from '../../certificate-request.service';

@Component({
  selector: 'app-dropdown-settings',
  templateUrl: './dropdown-settings.component.html'
})
export class DropdownSettingsComponent {
  constructor(
    private certificateService: CertificateRequestService
  ){};

  firms: any[] = [];
  @Output() firmasIdEmitter = new EventEmitter<number>();
  @Input() id: number = 0;


    ngOnInit(): void {
      this.findAll();
    }

    public findAll(): void {
      this.certificateService.findAllFirms().subscribe(
        (respose) => this.firms = respose
      )
    }

    public onSelect(id:string){
      console.log("response:" + id);
      this.firmasIdEmitter.emit(parseInt(id));
    }
}
