import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container" onclick="onclick">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="center">
        <img class="brand-logo" src="/assets/login.svg" alt="logo" aria-hidden="true">
        <input type="email" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button class="btn" (click)="onclick()" >Sign In</button>
        <h2>&nbsp;</h2>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor() { }





  onclick(){

    if (document.getElementsByTagName("input")[0].value == "admin" && document.getElementsByTagName("input")[1].value == "admin"){
      //css for alert a: https://www.w3schools.com/howto/howto_js_alert.asp
      alert("Login Successful");
        window.location.href = "/home";
    }else {
      alert("Login Failed");
    }

   }






}
