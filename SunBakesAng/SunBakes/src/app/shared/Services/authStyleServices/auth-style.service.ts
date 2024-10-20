import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStyleService {
  private baseUrl: string = 'http://localhost:5002/api/auth/style';

  constructor(private _HttpClient: HttpClient) { }

  getStyle(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }
}
