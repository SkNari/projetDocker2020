import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  constructor(private http: HttpClient) {

    this.loadToken();

  }


  setToken(token: any){

    sessionStorage.setItem('token', token);
    this.token = token;

  }

  loadToken(){

    this.token = sessionStorage.getItem('token');

  }

  getToken(){

    return this.token;

  }

  disconnect(){

    this.token = null;
    sessionStorage.removeItem('token');

  }
}
