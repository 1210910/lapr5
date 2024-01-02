import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {LiftInfo} from "./liftinfo";


@Component({
  selector: 'app-lift-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa fa-building"></i></div>
        <div class="title">{{ liftInfo.code }}</div>
        <a [routerLink]="['/liftdetails', liftInfo.code]" ><div class="descr">Learn More</div></a>
      </li>

    </ol>
  `,
  styleUrls: ['./lift-info.component.css']
})
export class LiftInfoComponent {

  @Input() liftInfo!: LiftInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    }
  }

}
