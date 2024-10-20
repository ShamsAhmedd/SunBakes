import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  sendContactForm(token: string, message: string): Observable<any> {
    return this.http.post('http://localhost:5002/api/contact', { token, message });
  }
}
