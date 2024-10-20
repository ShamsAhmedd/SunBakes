import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/Services/products/products.service';
import { Product } from '../../shared/interfaces/product';
import { CartService } from '../../shared/Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { LoginComponent } from '../login/login.component'; 

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product = {} as Product;
  isLoading = false;

  constructor(
    private _HttpClient: HttpClient,
    private _ProductsService: ProductsService,
    private _route: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private modalService: NgbModal 
  ) {}

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductsById(productId);
    }
  }

  getProductsById(productId: string): void {
    this._ProductsService.getProductById(productId).subscribe({
      next: (productData) => {
        this.product = productData;
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  addCart(id: string): void {
    if (localStorage.getItem('token')) {
      this.isLoading = true;
      this._CartService.addToCart(id).subscribe({
        next: (response) => {
          console.log(response);
          this._ToastrService.success(response.message);
          this. isLoading = false;
        },
        error: (err) => console.error('Error adding to cart:', err),
      });
    } else {
      this.showLoginModal();
    }
  }

  showLoginModal(): void {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result === 'loggedIn') {
        this.addCart(this.product._id);
      }
    }).catch((error) => {
      console.log('Modal closed without login', error);
    });
  }
}
