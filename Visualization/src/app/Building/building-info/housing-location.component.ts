import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../houselocation';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `

    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa-brands fa-css3"></i></div>
        <div class="title">{{ housingLocation.name }}</div>
        <div class="descr">Learn More</div>
      </li>

    </ol>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {

  @Input() housingLocation!: HousingLocation;


}
