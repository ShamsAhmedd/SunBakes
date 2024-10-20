import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageError: string | null = null;
  isLoading = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
  ) {}

  ngOnInit(): void {}

  handleForm(): void {
    this.messageError = null;

    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            localStorage.setItem('token', response.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/headerAndFooter']);
          } else {
            this.messageError = 'Login failed. Please try again.';
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageError = error.error?.error || 'Access Denied , You Are Not Admin';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
