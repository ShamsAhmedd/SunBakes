import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/Services/authServices/auth-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStyleService } from '../../shared/Services/authStyleServices/auth-style.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  messageError: string | null = null;
  isLoading: boolean = false;
  videoSource: string = ''; 
  headerText: string = ''; 

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
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
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageError = error.error?.error || 'An unknown error occurred';
        }
      });
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
      error: console.error
    });
  }
}
