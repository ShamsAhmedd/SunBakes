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
  setLogin(userData:object):Observable<any> {
    return this._HttpClient.post('http://localhost:5002/api/auth/loginAdmin',userData);
  }


  logOut():void {
    localStorage.removeItem('token');
this._Router.navigate(['/login'])
  }

}
