import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/Services/authServices/auth-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  messageError: string | null = null;
  isLoading: boolean = false;
  showSuccessModal: boolean = false;  // Flag to control modal visibility

  ForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  ngOnInit(): void {}

  handleForm(): void {
    this.messageError = null;
    if (this.ForgetPasswordForm.valid) {
      this.isLoading = true;
      this._AuthService.forgotPassword(this.ForgetPasswordForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showSuccessModal = true;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageError = error.error?.error;
        }
      });
    }
  }

  closeModal(): void {
    this.showSuccessModal = false;
  }
}
