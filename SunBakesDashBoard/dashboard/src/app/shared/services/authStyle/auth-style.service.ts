import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthStyleService {

  constructor(private _HttpClient: HttpClient) { }

  addStyle(style: FormData): Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/auth/style', style);
  }

  getStyle(): Observable<any> {
    return this._HttpClient.get('http://localhost:5002/api/auth/style');
  }

  updateStyle(style: FormData, id: string): Observable<any> {
    return this._HttpClient.put(`http://localhost:5002/api/auth/style/${id}`, style);
  }

  deleteStyle(id: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:5002/api/auth/style/${id}`);
  }
}
