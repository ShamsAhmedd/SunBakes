import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-category',
  templateUrl: './control-category.component.html',
  styleUrl: './control-category.component.css'
})
export class ControlCategoryComponent implements OnInit{

  categories: any[] = [];
  messageError: string | null = null;
  isLoading = false;
  currentCategoryId: string | null = null;

  CategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(null)
  });

  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this._CategoryService.getCategory().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error fetching categories';
      }
    });
  }

  handleAddOrUpdateCategory(): void {
    if (this.CategoryForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      formData.append('title', this.CategoryForm.get('title')?.value);
      const imageFile = this.CategoryForm.get('imageUrl')?.value;

      if (imageFile) {
        formData.append('imageUrl', imageFile);
      }

      if (this.currentCategoryId) {
        this._CategoryService.updateCategory(formData, this.currentCategoryId).subscribe({
          next: () => {
            this.isLoading = false;
            this.getCategories();
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.messageError = 'Error updating category';
          }
        });
      } else {
        this._CategoryService.addCategory(formData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.getCategories();
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.messageError = 'Error adding category';
          }
        });
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.CategoryForm.patchValue({
        imageUrl: file
      });
    }
  }

  editCategory(category: any): void {
    this.currentCategoryId = category._id;
    this.CategoryForm.patchValue({
      title: category.title,
      imageUrl: null
    });
    this.CategoryForm.enable();
  }

  resetForm(): void {
    this.currentCategoryId = null;
    this.CategoryForm.reset();
    this.CategoryForm.enable();
  }

  deleteCategory(id: string): void {
    this._CategoryService.deleteCategory(id).subscribe({
      next: () => {
        this.getCategories();
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error deleting category';
      }
    });
  }

}
