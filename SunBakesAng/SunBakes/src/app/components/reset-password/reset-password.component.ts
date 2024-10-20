import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/Services/authServices/auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  messageError: string | null = null;
  isLoading: boolean = false;

  ResetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    token: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),

  });

constructor(private _AuthService:AuthService,
  private _Router: Router
){}

ngOnInit(): void {

}

handleForm(): void {
  this.messageError = null; 
  if (this.ResetPasswordForm.valid) {
    console.log(this.ResetPasswordForm.value);  
    this.isLoading = true;
    this._AuthService.resetPassword(this.ResetPasswordForm.value).subscribe({
      next: (response) => {
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageError = error.error?.message || 'Invalid token or email';
        }

    });
  }
}


}
