import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = 'http://localhost:5002/api/category';


  constructor(private _HttpClient:HttpClient) { }

  getCategory(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }

}
