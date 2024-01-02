import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotInfo } from './robotinfo';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-robot-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <li style="--accent-color:#6F42C1">
      <div class="icon"><i class="fa fa-robot"></i></div>
      <div class="title">{{ robotInfo.name }}</div>
      <a [routerLink]="['/robotdetails', {'code': robotInfo.code}]" ><div class="descr">Learn More</div></a>
    </li>
  `,
  styleUrls: ['./robot-info.component.css']
})
export class RobotInfoComponent {

  @Input() robotInfo!: RobotInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    }
  }


}
