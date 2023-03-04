import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../authResponseData.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  loginForm: FormGroup;
  authObservable: Observable<AuthResponseData>;
  error: string;
  userRegistered: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialize the Sign Up / In Form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.isLoading = false;
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm() {
    this.isLoading = true;

    // If the form is invalid, do nothing
    if (!this.loginForm.valid) return;

    // sign up | sign in
    if (this.isLoginMode) {
      this.authObservable = this.authService.signInUser(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      );
    } else {
      this.authObservable = this.authService.signUpUser(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      );
    }

    this.authObservable
      .pipe(
        tap({
          next: (responseData) => {
            // in case the user succesfully authenticated, redirect him to the main page
            if (this.isLoginMode) {
              this.isLoading = false;

              this.router.navigate(['/todos']);
            } else {
              this.isLoading = false;
              this.router.navigate(['/todos']);
            }
          },
          error: (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
          },
        })
      )
      .subscribe();

    // Reset Form Fields
    this.loginForm.reset();
  }
}
