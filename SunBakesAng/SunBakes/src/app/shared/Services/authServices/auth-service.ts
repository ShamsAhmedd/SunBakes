import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }
userData:any;
  decodeUserData(){
    if(localStorage.getItem('token')!=null){
      let encodeToken:any = localStorage.getItem('token');
      let decodeToken = jwtDecode(encodeToken)
      this.userData = decodeToken;
      console.log(decodeToken);
    }
  }
  setRegister(userData:object):Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/auth/Register',userData);
  }
  setLogin(userData:object):Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/auth/Login',userData);
  }

  forgotPassword(userData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/forget-password', userData);
  }

  resetPassword(userData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/reset-password', userData);
  }

  logOut():void {
    localStorage.removeItem('token');
this._Router.navigate(['/login'])
  }
  }
