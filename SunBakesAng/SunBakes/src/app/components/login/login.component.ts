import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/Services/authServices/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStyleService } from '../../shared/Services/authStyleServices/auth-style.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageError: string | null = null;
  isLoading = false; 
  videoSource = '';
  headerText = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _AuthStyleService: AuthStyleService
  ) {}

  ngOnInit(): void {
    this.getStyle(); 
  }

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
            this._Router.navigate(['/home']); 
          } else {
            this.messageError = 'Login failed. Please try again.'; 
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false; 
          this.messageError = error.error?.error || 'Password or Email not valid';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getStyle(): void {
    this._AuthStyleService.getStyle().subscribe({
      next: (styleData) => {
        if (styleData.length) {
          const style = styleData[0];
          this.videoSource = style.videoUrl; 
          this.headerText = style.title;
        }
      },
      error: (error) => {
        console.error('Error fetching styles:', error); 
      }
    });
  }
}
