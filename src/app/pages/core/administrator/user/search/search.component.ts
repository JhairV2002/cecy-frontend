import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@services/core/administrator/user.service';
import { MessageService } from '@services/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() users = new EventEmitter<any>();
  searchValue: string = '';
  constructor(
    private router: Router,
    private userService: UserService,
    public messageService: MessageService
  ) {}

  onSearchInputChange() {
    console.log('SEARCH', this.searchValue);
    if (this.searchValue === '') {
      this.router.navigate(['/administrator/users']).then(() => {
        this.userService.getUsers().subscribe({
          next: (data) => {
            this.users.emit(data);
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      });
    } else {
      this.router
        .navigate(['/administrator/users'], {
          queryParams: {
            search: this.searchValue,
          },
        })
        .then(() => {
          this.userService.searchUsers(this.searchValue).subscribe({
            next: (data) => {
              this.users.emit(data);
            },
            error: (error) => {
              console.error(error);
            },
          });
        });
    }
  }
}
