import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/Services/cart/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  cartDetails: any = {};

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this.loadCart(); 
  }

  getProductImageUrl(imageCover: string): string {
    return `http://localhost:5002/assets/${imageCover}?t=${new Date().getTime()}`;
  }

  loadCart(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.cart; 
      },
      error: (error) => {
        console.error(error); 
      }
    });
  }

  removeCartItem(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.cart; 
        this.loadCart();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  changeCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateCartProduct(id, count).subscribe({
        next: (response) => {
          this.cartDetails = response.cart; 
          this.loadCart();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error("Count must be greater than 0"); 
    }
  }
}
