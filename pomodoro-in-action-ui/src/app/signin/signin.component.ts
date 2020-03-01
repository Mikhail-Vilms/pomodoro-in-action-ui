import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinFormGroup: FormGroup;
  requiredAlert: string = 'This field is required';
  generalError: string = '';


  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);
    }

    this.createSigninForm();
    this.generalError = '';
  }

  createSigninForm() {
    this.signinFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // ==================================== EMAIL ============================================

  getErrorEmail() {
    let emailCtrl = this.signinFormGroup.get('email');

    if (emailCtrl.hasError('required')) {
      return this.requiredAlert;
    }

    return '';
  }
  
  // ==================================== PASSWORD ============================================

  getErrorPassword() {
    let passwordCtrl = this.signinFormGroup.get('password');

    if (passwordCtrl.hasError('required')) {
      return this.requiredAlert;
    }

    return '';
  }

  // ========================================= SUBMIT ===================================================

  onSubmit() {
    if (!this.signinFormGroup.valid) {
      this.generalError = "Fill all required fields";
      return;
    }

    this.usersService
      .loginPost(
        this.signinFormGroup.value.email,
        this.signinFormGroup.value.password)
      .subscribe((res: any) => {
        if (res["token"]){
          localStorage.setItem('token', res["token"]); 
          this.router.navigate(['/dashboard']);
        }
      },
      err => {
        this.generalError = JSON.stringify(err);
      });
  }

}
