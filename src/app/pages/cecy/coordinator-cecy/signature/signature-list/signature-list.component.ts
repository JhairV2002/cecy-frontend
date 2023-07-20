import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signature } from '@models/cecy/coordinator-cecy';

import { SignatureService } from '@services/cecy/coordinator-cecy';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-signature-list',
  templateUrl: './signature-list.component.html',
  styleUrls: ['./signature-list.component.css'],
})
export class SignatureListComponent implements OnInit {
  signature: Signature[] = [];
  loading$ = this.signatureService.loading$;

  constructor(
    private signatureService: SignatureService,
    public messageService: MessageService,
    private router: Router
  ) {
    this.checkSearchParams();
  }

  ngOnInit(): void {
    this.loadAllSignatures();
  }

  loadAllSignatures() {
    this.signatureService.getSignaturesAll().subscribe({
      next: (data: any) => {
        console.log('SIGNATURES', data);
        this.signature = data;
      },
      error: (error: any) => {
        this.messageService.error(error);
      },
    });
  }

  editSignature(signature: Signature) {
    this.router.navigate([
      `/cecy/coordinator-cecy/signature/edit/${signature.id}`,
    ]);
    console.log('edit', signature);
  }

  deleteSignature(signature: Signature) {
    console.log('delete', signature);
    this.messageService.questionDeleteSign({}).then((result) => {
      if (result.isConfirmed) {
        this.signatureService.deleteByIdSignature(signature.id).subscribe({
          next: (data) => {
            this.messageService.successSign(data);
            this.loadAllSignatures();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  checkSearchParams(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams['search']) {
      history.replaceState(null, '', '/cecy/coordinator-cecy/signature');
    }
  }

  searchSignatures(courses: any) {
    console.log('PADRE ESTO ME BUSCO', courses);
    this.signature = courses;
  }
}
