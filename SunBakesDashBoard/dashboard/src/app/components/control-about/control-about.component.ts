import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutService } from '../../shared/services/about/about.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-about',
  templateUrl: './control-about.component.html',
  styleUrls: ['./control-about.component.css']
})
export class ControlAboutComponent implements OnInit {
  about: any[] = [];
  messageError: string | null = null;
  isLoading = false;
  currentAboutId: string | null = null;

  AboutForm: FormGroup = new FormGroup({
    headerImg: new FormControl(null),
    flipImage: new FormControl(null),
    description: new FormControl('', Validators.required),
  });

  constructor(private _AboutService: AboutService) {}

  ngOnInit(): void {
    this.getAbout();
  }

  getAbout(): void {
    this.isLoading = true;
    this._AboutService.getAbout().subscribe({
      next: (response) => {
        this.about = response;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.messageError = 'Error fetching about items';
      }
    });
  }

  handleAddOrUpdateAbout(): void {
    if (this.AboutForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      this.appendAboutFormData(formData);

      if (this.currentAboutId) {
        this._AboutService.updateAbout(formData, this.currentAboutId).subscribe({
          next: () => this.handleResponse(),
          error: () => this.handleError('Error updating about item')
        });
      } else {
        this._AboutService.addAbout(formData).subscribe({
          next: () => this.handleResponse(),
          error: () => this.handleError('Error adding about item')
        });
      }
    }
  }

  private appendAboutFormData(formData: FormData): void {
    Object.keys(this.AboutForm.controls).forEach((key) => {
      const value = this.AboutForm.get(key)?.value;
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });
  }

  private handleResponse(): void {
    this.isLoading = false;
    this.getAbout();
    this.resetAboutForm();
  }

  private handleError(message: string): void {
    this.isLoading = false;
    this.messageError = message;
  }

  resetAboutForm(): void {
    this.currentAboutId = null;
    this.AboutForm.reset();
  }

  onAboutFileSelected(event: any, fieldName: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.AboutForm.patchValue({
        [fieldName]: file
      });
    }
  }

  editAbout(about: any): void {
    this.currentAboutId = about._id;
    this.AboutForm.patchValue({
      headerImg: null,
      flipImage: null,
      description: about.description,
    });
  }

  deleteAbout(id: string): void {
    this._AboutService.deleteAbout(id).subscribe({
      next: () => {
        this.getAbout();
      },
      error: () => {
        this.messageError = 'Error deleting about item';
      }
    });
  }
}
