import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  formLogin: FormGroup;
  primeIcons = PrimeIcons;
  constructor(private formBuilder: FormBuilder) {
    this.formLogin = this.newFormLogin();
  }

  ngOnInit(): void {}
  newFormLogin(): FormGroup {
    return this.formBuilder.group({
      username: ['123456789', [Validators.required]],
      password: ['12345678', [Validators.required]],
    });
  }

  createUser(){
    console.log('Usuario creado con exito');

  }
}
