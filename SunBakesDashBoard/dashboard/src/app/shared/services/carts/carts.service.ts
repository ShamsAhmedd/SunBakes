import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private apiUrl = 'http://localhost:5002/api/cart/all';

  constructor(private _HttpClient: HttpClient) { }

  getCart(): Observable<any> {
    return this._HttpClient.get(this.apiUrl);

  }
}
