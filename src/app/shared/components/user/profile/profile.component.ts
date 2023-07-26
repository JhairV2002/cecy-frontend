import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@models/authentication';
import { AuthService } from '@services/auth';
import { UserService } from '@services/core/administrator';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() isOpen: boolean = false;
  @Output() clickClose = new EventEmitter<boolean>();
  visible: boolean = false;
  user: User = {
    names: '',
    lastnames: '',
    email: '',
    image: '',
  };
  isEditingImage: boolean = false;
  isEditingNames: boolean = false;
  isEditingLastnames: boolean = false;
  isEditingEmail: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data: any) => {
      if (data !== null) {
        this.user = data[0];
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  closeModal() {
    this.clickClose.emit(false);
    this.isEditingImage = false;
    this.isEditingNames = false;
    this.isEditingLastnames = false;
    this.isEditingEmail = false;
  }

  editImage(event: any) {
    event.stopPropagation();
    this.isEditingImage = true;
  }

  saveImage(event: any) {
    event.stopPropagation();
    console.log('GUARDAR IMAGEN');
    this.userService.updateByImage(this.user?.id, this.user?.image).subscribe({
      next: (data) => {
        console.log(data);
        this.isEditingImage = false;
      },
      error: (error) => {
        console.error(error);
        this.isEditingImage = false;
      },
    });
  }

  toggleEditingNames() {
    if (this.isEditingNames) {
      this.saveNames();
    } else {
      this.isEditingNames = true;
    }
  }

  saveNames() {
    console.log('GUARDAR NOMBRES');
    console.log('NOMBRES', this.user.names);
    this.userService.updateByName(this.user?.id, this.user?.names).subscribe({
      next: (data) => {
        console.log(data);
        this.isEditingNames = false;
      },
      error: (error) => {
        console.error(error);
        this.isEditingImage = false;
      },
    });
  }

  toggleEditingLastnames() {
    if (this.isEditingLastnames) {
      this.saveLastnames();
    } else {
    }
    this.isEditingLastnames = true;
  }

  saveLastnames() {
    console.log('GUARDAR APELLIDOS');
    console.log('APELLIDOS', this.user.lastnames);
    this.userService
      .updateByLastNames(this.user?.id, this.user?.lastnames)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isEditingLastnames = false;
        },
        error: (error) => {
          console.error(error);
          this.isEditingLastnames = false;
        },
      });
  }

  toggleEditingEmail() {
    if (this.isEditingEmail) {
      this.saveEmail();
    } else {
      this.isEditingEmail = true;
    }
  }

  saveEmail() {
    console.log('GUARDAR EMAIL');
    console.log('EMAIL', this.user.email);
    this.userService.updateByEmail(this.user?.id, this.user?.email).subscribe({
      next: (data) => {
        console.log(data);
        this.isEditingEmail = false;
      },
      error: (error) => {
        console.error(error);
        this.isEditingEmail = false;
      },
    });
  }
}
