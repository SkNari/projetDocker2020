import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  messageForm : any;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private authService : AuthService,private router: Router) {

    this.messageForm = this.formBuilder.group({
      message:''
    });

   }

  ngOnInit(): void {
  }

  onSubmit(messageData : any) {

    this.messageForm.reset();

    var body = {
      message: messageData.message
    }

    var options = {
      headers: {token : this.authService.getToken()}
    }
    
    this.http.post<any>('http://localhost:8000/post', body, options).subscribe(
      data => {
        this.router.navigate([""]);
      },
      error => {
        console.log(error);
      }
    );

  }

}
