import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:5002/api/category';

  constructor(private _HttpClient: HttpClient) { }

  addCategory(category: FormData): Observable<any> {
    return this._HttpClient.post(this.apiUrl, category);
  }

  getCategory(): Observable<any> {
    return this._HttpClient.get(this.apiUrl);
  }

  updateCategory(category: FormData, id: string): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/${id}`);
  }
}
