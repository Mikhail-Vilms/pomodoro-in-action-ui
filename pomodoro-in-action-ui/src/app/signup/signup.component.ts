import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupFormGroup: FormGroup;
  requiredAlert: string = 'This field is required';
  generalError: string;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);
    }
    
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupFormGroup = this.fb.group({
      username: ['', [Validators.required, this.checkUsername]],
      email: ['', [Validators.required, this.checkEmail]],
      password: ['', [Validators.required, this.checkPassword]],
      confirm: ['', Validators.required],
    });
  }

  // ==================================== USERNAME ============================================

  checkUsername(control) {
    let enteredUsername = control.value;

    // Alphanumeric characters and hyphens
    let usernameRegex = /^[a-zA-Z0-9]+([-]?[a-zA-Z0-9])*$/;

    return (enteredUsername && (enteredUsername.length <= 6 || !usernameRegex.test(enteredUsername))) ? { 'pattern': true } : null;
  }

  getErrorUsername() {
    let emailCtrl = this.signupFormGroup.get('username');

    if (emailCtrl.hasError('required')) {
      return "Field is required (at least six alphanumeric characters or hyphens; cannot begin or end with a hyphen)";
    }
    if (emailCtrl.hasError('pattern')) {
      return 'Username needs to be at least six alphanumeric characters or hyphens; cannot begin or end with a hyphen';
    }

    return '';
  }

  // ==================================== EMAIL ============================================

  checkEmail(control) {
    let enteredEmail = control.value;
    
    // dummy email regex
    let emailRegex = /[^@]+@[^\.]+\..+/;

    return (enteredEmail && !emailRegex.test(enteredEmail)) ? { 'pattern': true } : null;
  }

  getErrorEmail() {
    let emailCtrl = this.signupFormGroup.get('email');

    if (emailCtrl.hasError('required')) {
      return this.requiredAlert;
    }
    if (emailCtrl.hasError('pattern')) {
      return 'Not a valid email address';
    }

    return '';
  }

  // ==================================== PASSWORD ============================================

  checkPassword(control) {
    let enteredPassword = control.value

    //(?=.*[a-z]) : Should have at least one lower case
    //(?=.*[A-Z]) : Should have at least one upper case
    //.{6,} : Minimum 6 characters
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

    return (enteredPassword && !passwordRegex.test(enteredPassword)) ? { 'pattern': true } : null;
  }

  getErrorPassword() {
    let passwordCtrl = this.signupFormGroup.get('password');

    if (passwordCtrl.hasError('required')) {
      return 'Field is required (at least six characters, one uppercase letter and one digit)';
    }
    if (passwordCtrl.hasError('pattern')) {
      return 'Password needs to be at least six characters, one uppercase letter and one digit';
    }

    return '';
  }

  // ==================================== CONFIRM ====================================

  getErrorConfirm() {
    let confirmCtrl = this.signupFormGroup.get('confirm');

    if (confirmCtrl.hasError('required')) {
      return this.requiredAlert;
    }

    return '';
  }

  // ==================================== SUBMIT ====================================

  onSubmit() {
    if (!this.signupFormGroup.valid) {
      this.generalError = "Fill all required fields";
      return;
    }
    
    if (this.signupFormGroup.get('confirm').value != this.signupFormGroup.get('password').value) {
      this.generalError = "Confirmation doesn't match password";
      return;
    }

    this.userService
      .registerPost(
        this.signupFormGroup.value.username,
        this.signupFormGroup.value.email,
        this.signupFormGroup.value.password)
      .subscribe((res: any) => {
        if (res.succeeded) {
          this.router.navigate(['/signup-success']);
        } else {
          this.generalError = res;
        }
      },
      err => {
        this.generalError = err;
      });
  }
}