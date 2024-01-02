import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {RoomInfo} from "./roominfo";


@Component({
  selector: 'app-room-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa fa-building"></i></div>
        <div class="title">{{  }}</div>
        <a [routerLink]="['/roomdetails', roomInfo.roomCode]" ><div class="descr">Learn More</div></a>
      </li>

    </ol>
  `,
  styleUrls: ['./room-info.component.css']
})
export class RoomInfoComponent {

  @Input() roomInfo!: RoomInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    }
  }

}
