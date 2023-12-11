import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotTypeInfo } from './robotTypeInfo';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-passageway-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ robotInfo.name }}</h2>
      <p class="listing-location">Code: {{ robotInfo.code }}</p>
      <p class="listing-location">Type: {{ robotInfo.type }}</p>
      <p class="listing-location">Status: {{ robotInfo.enabled }}</p>
      <p class="listing-location">Description: {{ robotInfo.description }}</p>
    </section>
  `,
  styleUrls: ['./robot-info.component.css']
})
export class RobotInfoComponent {

  @Input() robotInfo!: RobotTypeInfo;


}
