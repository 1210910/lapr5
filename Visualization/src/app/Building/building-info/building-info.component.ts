import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BuildingInfo } from './buildingInfo';


@Component({
  selector: 'app-building-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `

    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa fa-building"></i></div>
        <div class="title"><h1>{{ building.name}}</h1></div>
        <a [routerLink]="['/buildingdetails', building.code]" ><div class="descr">Learn More</div></a>
      </li>

    </ol>
  `,
  styleUrls: ['./building-info.component.css']
})
export class BuildingInfoComponent {

  @Input() building!: BuildingInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    }
  }

}
