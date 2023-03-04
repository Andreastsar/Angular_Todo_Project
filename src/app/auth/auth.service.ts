import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData } from './authResponseData.interface';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  // This observable keeps the state of the signed up / logged in user
  user = new BehaviorSubject<User>(null);

  // Sign Up
  signUpUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTmmV8QJ3OilSrCtpt8YEzgnm7dDMPiIs',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An unknown error has occurred';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => {
              return errorMessage;
            });
          }

          return throwError(() => {
            return this.handleError(errorResponse);
          });
        }),
        tap((responseData) => {
          // if the user successfully signed in, we store the user and send him to the observable
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  // --------------------------------------------------------------------------------------------------------------------------

  // Sign in
  signInUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTmmV8QJ3OilSrCtpt8YEzgnm7dDMPiIs',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An unknown error has occurred';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => {
              return errorMessage;
            });
          }

          return throwError(() => {
            return this.handleError(errorResponse);
          });
        }),
        tap((responseData) => {
          // if the user successfully signed in, we store the user and send him to the observable
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn,
            responseData.registered
          );
        })
      );
  }
  // --------------------------------------------------------------------------------------------------------------------------
  // Auto Login
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
  // --------------------------------------------------------------------------------------------------------------------------

  // Logout
  logout() {
    // Clear local storage
    localStorage.removeItem('userData');

    // Empty the current user
    this.user.next(null);

    this.router.navigate(['/home']);
  }

  // --------------------------------------------------------------------------------------------------------------------------

  // Create the user if the Sign up / in is successful
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    registered?: boolean
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate, registered);

    this.user.next(user);

    // Save the user to the browser local storage
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Error Handling for sign up / sign in
  private handleError(errorMessageInc: HttpErrorResponse): string {
    let errorMessage;
    switch (errorMessageInc.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid!';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator!';
        break;
      default:
        errorMessage = 'An error occured';
        break;
    }

    return errorMessage;
  }
}
