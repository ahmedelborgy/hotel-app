import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }
  }


  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decode: any = jwtDecode(encoded);
    console.log(decode);
    localStorage.setItem('userRole', decode.role);
    localStorage.setItem('user_id', decode._id);
    // localStorage.setItem('userName', decode.role);
  }


  onLogin(data: object): Observable<any> {
    return this._HttpClient.post('/admin/users/login', data)
  }

  onResetPassword(data: object): Observable<any> {
    return this._HttpClient.post('/portal/users/reset-password', data)
  }
  onForgotPassword(data: any): Observable<any> {
    return this._HttpClient.post('/portal/users/forgot-password', data)
  }

  onRegister(data: any): Observable<any> {
    return this._HttpClient.post('/portal/users', data)

  }
  myLogout() {
    localStorage.clear();
    this._Router.navigateByUrl('/auth/login')
  }

  onUserChangePassword(data: any) {
    return this._HttpClient.post('/admin/users/change-password', data)
  }

  onLogOut() {
    localStorage.clear()
  }

}
