import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderAndFooterService {

  private baseUrl: string = 'http://localhost:5002/api/headerAndFooter';

  constructor(private _HttpClient:HttpClient) { }

  getHeaderAndFooter(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }
}
