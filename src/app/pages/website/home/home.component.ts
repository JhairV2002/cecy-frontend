import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchValue: string = '';

  constructor(
    private router: Router
  ) {
    this.checkSearchParams();
  }


  onSearchInputChange(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.redirectToSearchPage();
    }
  }
  redirectToSearchPage() {
    console.log('BUSCANDO');
    if (this.searchValue.trim() !== '') {
      const searchTerm = this.searchValue; // No necesitas codificar aquí
      this.router.navigate(['/courses'], { queryParams: { search: searchTerm } });
    }
  }

  checkSearchParams(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams['search']) {
      history.replaceState(null, '', '');
    }
  }
}


