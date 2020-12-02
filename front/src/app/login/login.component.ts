import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : any;

  constructor(private router : Router,private formBuilder: FormBuilder,private http : HttpClient,private authService : AuthService) {

    this.loginForm = this.formBuilder.group({
      name: '',
      password: ''
    });

   }

  ngOnInit(): void {
  }

  onSubmit(loginData : any) {

    this.loginForm.reset();

    var body = {
      login : loginData.name,
      password : loginData.password
    }

    var options = {
      headers: {}
    }

    this.http.post<any>('http://localhost:8000/login', body, options).subscribe(
      data => {
        this.authService.setToken(data.token);
        this.router.navigate([""]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
