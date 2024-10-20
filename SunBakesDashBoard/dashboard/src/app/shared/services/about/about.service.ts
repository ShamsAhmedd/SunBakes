import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private apiUrl = 'http://localhost:5002/api/about';

  constructor(private _HttpClient: HttpClient) { }

  addAbout(about: FormData): Observable<any> {
    return this._HttpClient.post(this.apiUrl, about);
  }

  getAbout(): Observable<any> {
    return this._HttpClient.get(this.apiUrl);
  }

  updateAbout(about: FormData, id: string): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/${id}`, about);
  }

  deleteAbout(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/${id}`);
  }
}
