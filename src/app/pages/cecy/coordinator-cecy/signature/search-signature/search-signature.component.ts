import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SignatureService } from '@services/cecy/coordinator-cecy';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-search-signature',
  templateUrl: './search-signature.component.html',
  styleUrls: ['./search-signature.component.css'],
})
export class SearchSignatureComponent implements OnInit {
  @Output() signatureSearch = new EventEmitter<any>();
  searchTerm: string = '';
  result: [] = [];

  constructor(
    private signatureService: SignatureService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSearchInput(): void {
    console.log('SEARCH', this.searchTerm);
    if (this.searchTerm === '') {
      this.router.navigate(['/cecy/coordinator-cecy/signature']).then(() => {
        this.signatureService.getSignaturesAll().subscribe({
          next: (data) => {
            this.signatureSearch.emit(data);
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      });
    } else {
      this.router
        .navigate(['/cecy/coordinator-cecy/signature'], {
          queryParams: {
            search: this.searchTerm,
          },
        })
        .then(() => {
          this.signatureService.search(this.searchTerm).subscribe({
            next: (data) => {
              console.log('SEARCH COURSES', data);
              this.signatureSearch.emit(data);
            },
            error: (error) => {
              console.error(error);
            },
          });
        });
    }
  }
}
