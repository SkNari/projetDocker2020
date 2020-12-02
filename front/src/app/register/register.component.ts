import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : any;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router : Router) {

    this.registerForm = this.formBuilder.group({
      name: '',
      password: ''
    });

   }

  ngOnInit(): void {
  }

  onSubmit(loginData : any) {

    this.registerForm.reset();

    var body = {
      login : loginData.name,
      password : loginData.password
    }

    var options = {
      headers: {}
    }

    this.http.post<any>('http://localhost:8000/register', body, options).subscribe(
      data => {
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
