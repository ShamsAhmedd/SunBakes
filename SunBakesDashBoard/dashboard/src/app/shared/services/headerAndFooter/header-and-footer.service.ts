import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderAndFooterService {

  constructor(private _HttpClient: HttpClient) { }

  addHeaderAndFooter(HeaderAndFooter: FormData): Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/headerAndFooter', HeaderAndFooter);
  }

  getHeaderAndFooter(): Observable<any> {
    return this._HttpClient.get('http://localhost:5002/api/headerAndFooter');
  }

  updateHeaderAndFooter(HeaderAndFooter: FormData, id: string): Observable<any> {
    return this._HttpClient.put(`http://localhost:5002/api/headerAndFooter/${id}`, HeaderAndFooter);
  }

  deleteHeaderAndFooter(id: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:5002/api/headerAndFooter/${id}`);
  }
}
