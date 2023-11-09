import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../houselocation';
import { RouterLink, RouterOutlet } from '@angular/router';
import {FloorInfo} from "./floorinfo";



@Component({
  selector: 'app-floor-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa fa-building"></i></div>
        <div class="title">{{ floorInfo.floorCode }}</div>
        <a [routerLink]="['/floordetails', floorInfo.floorCode]" ><div class="descr">Learn More</div></a>
      </li>

    </ol>
  `,
  styleUrls: ['./floor-info.component.css']
})
export class FloorInfoComponent {

  @Input() floorInfo!: FloorInfo;



}
