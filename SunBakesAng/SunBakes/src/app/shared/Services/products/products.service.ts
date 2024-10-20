import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>{
return this._HttpClient.get('http://localhost:5002/api/products')
  }
  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this._HttpClient.get<any[]>(`http://localhost:5002/api/products/category/${categoryId}`);
  }

  getProductById(productId: string): Observable<any> {
    return this._HttpClient.get(`http://localhost:5002/api/products/${productId}`);
  }
}

