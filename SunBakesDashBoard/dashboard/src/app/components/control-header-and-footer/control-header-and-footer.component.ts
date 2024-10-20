import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderAndFooterService } from '../../shared/services/headerAndFooter/header-and-footer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-header-and-footer',
  templateUrl: './control-header-and-footer.component.html',
  styleUrls: ['./control-header-and-footer.component.css'],
})
export class ControlHeaderAndFooterComponent implements OnInit {
  headerAndFooters: any[] = [];
  messageError: string | null = null;
  isLoading = false;
  currentHeaderAndFooterId: string | null = null;

  HeaderAndFooterForm: FormGroup = new FormGroup({
    logo: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    gmail: new FormControl('', [Validators.required]),
    headerImg: new FormControl(null),
    image1: new FormControl(null),
    image2: new FormControl(null),
    image3: new FormControl(null),
  });

  constructor(private headerAndFooterService: HeaderAndFooterService) {}

  ngOnInit(): void {
    this.getHeaderAndFooter();
  }

  getHeaderAndFooter(): void {
    this.headerAndFooterService.getHeaderAndFooter().subscribe({
      next: (response) => {
        this.headerAndFooters = response;
        if (this.headerAndFooters.length > 0) {
          this.HeaderAndFooterForm.disable();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error fetching header and footer';
      }
    });
  }

  handleAddOrUpdateHeaderAndFooter(): void {
    if (this.HeaderAndFooterForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      this.appendFormData(formData);

      if (this.currentHeaderAndFooterId) {
        this.headerAndFooterService.updateHeaderAndFooter(formData, this.currentHeaderAndFooterId).subscribe({
          next: () => {
            this.handleResponse();
          },
          error: () => {
            this.handleError('Error updating header and footer');
          }
        });
      } else {
        this.headerAndFooterService.addHeaderAndFooter(formData).subscribe({
          next: () => {
            this.handleResponse();
          },
          error: () => {
            this.handleError('Error adding header and footer');
          }
        });
      }
    }
  }

  private appendFormData(formData: FormData): void {
    Object.keys(this.HeaderAndFooterForm.controls).forEach((key) => {
      const value = this.HeaderAndFooterForm.get(key)?.value;
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });
  }

  private handleResponse(): void {
    this.isLoading = false;
    this.getHeaderAndFooter();
    this.resetForm();
  }

  private handleError(message: string): void {
    this.isLoading = false;
    this.messageError = message;
  }

  onFileSelected(event: any, fieldName: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.HeaderAndFooterForm.patchValue({
        [fieldName]: file,
      });
    }
  }

  editHeaderAndFooter(headerAndFooter: any): void {
    this.currentHeaderAndFooterId = headerAndFooter._id;
    this.HeaderAndFooterForm.patchValue({
      logo: headerAndFooter.logo,
      address: headerAndFooter.address,
      phone: headerAndFooter.phone,
      gmail: headerAndFooter.gmail,
      headerImg: null,
      image1: null,
      image2: null,
      image3: null,
    });
    this.HeaderAndFooterForm.enable();
  }

  resetForm(): void {
    this.currentHeaderAndFooterId = null;
    this.HeaderAndFooterForm.reset();
    this.HeaderAndFooterForm.enable();
  }

  deleteStyle(id: string): void {
    this.headerAndFooterService.deleteHeaderAndFooter(id).subscribe({
      next: () => {
        this.getHeaderAndFooter();
      },
      error: () => {
        this.messageError = 'Error deleting header and footer';
      }
    });
  }
}
