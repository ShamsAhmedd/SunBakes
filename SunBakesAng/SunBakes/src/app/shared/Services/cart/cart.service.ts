import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({ token }); 
  }

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/cart',
      { productId: productId },
      { headers: this.getHeaders() }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get('http://localhost:5002/api/cart', {
      headers: this.getHeaders(),
    });
  }

  removeItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:5002/api/cart/${productId}`, {
      headers: this.getHeaders(),
    });
  }

  updateCartProduct(productId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`http://localhost:5002/api/cart/${productId}`,
      { count: newCount },
      { headers: this.getHeaders() }
    );
  }
}
