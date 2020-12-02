import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages : any;
  constructor(private messageService : MessageService,private authService: AuthService,private router : Router) {

  }

  ngOnInit(): void {

    this.messageService.getMessages().subscribe( data => {

      this.messages = data;

    })

  }

  disconnect(){

    this.authService.disconnect();
    this.router.navigate(["login"]);

  }

  goToPost(){

    this.router.navigate(["post"]);

  }

}
