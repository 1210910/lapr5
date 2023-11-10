import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassagewayInfo } from './passagewayinfo';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-passageway-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ passagewayInfo.passageCode }}</h2>
      <p class="listing-location">Floor 1: {{ passagewayInfo.floor1 }}</p>
      <p class="listing-location">Floor 2: {{ passagewayInfo.floor2 }}</p>
      <p class="listing-location">Description: {{ passagewayInfo.description }}</p>
    </section>
  `,
  styleUrls: ['./passageway-info.component.css']
})
export class PassagewayInfoComponent {

  @Input() passagewayInfo!: PassagewayInfo;


}
