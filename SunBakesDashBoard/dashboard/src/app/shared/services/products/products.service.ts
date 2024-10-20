import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:5002/api/products';
  private apiCategory ='http://localhost:5002/api/category';

  constructor(private _HttpClient: HttpClient) { }

  addProduct(product: FormData): Observable<any> {
    return this._HttpClient.post(this.apiUrl, product);
  }

  getProduct(): Observable<any> {
    return this._HttpClient.get(this.apiUrl);
  }

  updateProduct(product: FormData, id: string): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/${id}`);
  }

  getCategory(): Observable<any> {
    return this._HttpClient.get(this.apiCategory);
  }


}
