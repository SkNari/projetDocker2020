import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : any;

  constructor(private formBuilder: FormBuilder,private http : HttpClient) {

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

    console.log(body);

    var options = {
      headers: { }
    }

    this.http.post<any>('http://localhost:8000/login', body, options).subscribe(
      data => {
        console.log(data)
        sessionStorage.setItem('token', data.token);
      },
      error => {
        console.log(error);
      }
    );
  }

}
