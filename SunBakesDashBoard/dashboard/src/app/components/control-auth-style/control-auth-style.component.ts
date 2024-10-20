import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStyleService } from '../../shared/services/authStyle/auth-style.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-auth-style',
  templateUrl: './control-auth-style.component.html',
  styleUrls: ['./control-auth-style.component.css']
})
export class ControlAuthStyleComponent implements OnInit {
  styles: any[] = [];
  messageError: string | null = null;
  isLoading = false;
  currentStyleId: string | null = null;

  authStyleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    videoUrl: new FormControl(null)
  });

  constructor(private authStyleService: AuthStyleService) {}

  ngOnInit(): void {
    this.getStyles();
  }

  getStyles(): void {
    this.authStyleService.getStyle().subscribe({
      next: (response) => {
        this.styles = response;
        if (this.styles.length > 0) {
          this.authStyleForm.disable();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error fetching styles';
      }
    });
  }

  handleAddOrUpdateStyle(): void {
    if (this.authStyleForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      formData.append('title', this.authStyleForm.get('title')?.value);
      const videoFile = this.authStyleForm.get('videoUrl')?.value;
      if (videoFile) {
        formData.append('videoUrl', videoFile);
      }

      if (this.currentStyleId) {
        this.authStyleService.updateStyle(formData, this.currentStyleId).subscribe({
          next: () => {
            this.isLoading = false;
            this.getStyles();
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.messageError = 'Error updating style';
          }
        });
      } else {
        this.authStyleService.addStyle(formData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.getStyles();
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.messageError = 'Error adding style';
          }
        });
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.authStyleForm.patchValue({
        videoUrl: file
      });
    }
  }

  editStyle(style: any): void {
    this.currentStyleId = style._id;
    this.authStyleForm.patchValue({
      title: style.title,
      videoUrl: null
    });
    this.authStyleForm.enable();
  }

  resetForm(): void {
    this.currentStyleId = null;
    this.authStyleForm.reset();
    this.authStyleForm.enable();
  }

  deleteStyle(id: string): void {
    this.authStyleService.deleteStyle(id).subscribe({
      next: () => {
        this.getStyles();
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error deleting style';
      }
    });
  }
}
