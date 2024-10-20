import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../shared/services/carts/carts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-carts',
  templateUrl: './control-carts.component.html',
  styleUrls: ['./control-carts.component.css']
})
export class ControlCartsComponent implements OnInit {
  carts: any = null;
  messageError: string | null = null;

  constructor(private _CartsService: CartsService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this._CartsService.getCart().subscribe({
      next: (response) => {
        this.carts = response.carts;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.messageError = 'Error fetching cart details.';
      }
    });
  }
}
