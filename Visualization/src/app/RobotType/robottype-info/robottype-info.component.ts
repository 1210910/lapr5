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
      <h2 class="listing-heading">{{ robotInfo.code }}</h2>
      <p class="listing-location">Brand: {{ robotInfo.brand }}</p>
      <p class="listing-location">Model: {{ robotInfo.model }}</p>
      <p class="listing-location">Description: {{ robotInfo.description }}</p>
      <p class="listing-location">Task type: {{ robotInfo.taskTypeCode }}</p>
    </section>
  `,
  styleUrls: ['./robottype-info.component.css']
})
export class RobottypeInfoComponent {

  @Input() robotInfo!: RobotTypeInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    }
  }

}
