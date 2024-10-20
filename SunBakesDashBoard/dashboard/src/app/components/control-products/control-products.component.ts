import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../shared/services/products/products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-products',
  templateUrl: './control-products.component.html',
  styleUrls: ['./control-products.component.css']
})
export class ControlProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  messageError: string | null = null;
  isLoading = false;
  currentProductId: string | null = null;

  ProductForm: FormGroup = new FormGroup({
    headerImg: new FormControl(null),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    imageCover: new FormControl(null),
    category: new FormControl(null, [Validators.required]),
    ratingAverage: new FormControl(null, [Validators.min(0), Validators.max(5)])
  });

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.isLoading = true;
    this._ProductsService.getProduct().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.messageError = 'Error fetching products';
      }
    });
  }

  getCategories(): void {
    this.isLoading = true;
    this._ProductsService.getCategory().subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.messageError = 'Error fetching categories';
      }
    });
  }

  handleAddOrUpdateProduct(): void {
    if (this.ProductForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      this.appendProductFormData(formData);

      if (this.currentProductId) {
        this._ProductsService.updateProduct(formData, this.currentProductId).subscribe({
          next: () => this.handleResponse(),
          error: () => this.handleError('Error updating product')
        });
      } else {
        this._ProductsService.addProduct(formData).subscribe({
          next: () => this.handleResponse(),
          error: () => this.handleError('Error adding product')
        });
      }
    }
  }

  private appendProductFormData(formData: FormData): void {
    Object.keys(this.ProductForm.controls).forEach((key) => {
      const value = this.ProductForm.get(key)?.value;
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });
  }

  private handleResponse(): void {
    this.isLoading = false;
    this.getProducts();
    this.resetProductForm();
  }

  private handleError(message: string): void {
    this.isLoading = false;
    this.messageError = message;
  }

  resetProductForm(): void {
    this.currentProductId = null;
    this.ProductForm.reset();
  }

  onProductFileSelected(event: any, fieldName: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.ProductForm.patchValue({
        [fieldName]: file
      });
    }
  }

  editProduct(product: any): void {
    this.currentProductId = product._id;
    this.ProductForm.patchValue({
      headerImg: null,
      title: product.title,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      imageCover: null,
      category: product.category._id,
      ratingAverage: product.ratingAverage
    });
  }

  deleteProduct(id: string): void {
    this._ProductsService.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: () => {
        this.messageError = 'Error deleting product';
      }
    });
  }
}
