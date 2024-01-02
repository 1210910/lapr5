import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {UserInfo} from "./userinfo";


@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa fa-building"></i></div>
        <div class="title">{{  }}</div>
      </li>

    </ol>
  `,
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  @Input() userInfo!: UserInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "User") {
      window.location.href = "/";
    }
  }

}
