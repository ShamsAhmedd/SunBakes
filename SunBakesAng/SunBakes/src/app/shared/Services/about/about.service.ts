import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private baseUrl: string = 'http://localhost:5002/api/about';

  constructor(private _HttpClient:HttpClient) { }

  getAbout(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }
  getTeam(): Observable<any> {
    return this._HttpClient.get('http://localhost:5002/api/team');
  }

}
