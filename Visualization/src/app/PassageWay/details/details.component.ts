import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PassagewayService } from "../../services/passageway.service";
import { PassagewayInfo } from "../passageway-info/passagewayinfo";

@Component({
  selector: 'app-passageway-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/passagewayList']">
              <img class="brand-logo" src="/assets/logoPassageway.svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
    <article>

      <section class="listing-description">
        <h2 class="listing-heading">{{passagewayInfo?.passageCode}}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Passageway</h2>
        <ul>
          <li>Floor 1: {{passagewayInfo?.floor1}}</li>
          <li>Floor 2: {{passagewayInfo?.floor2}}</li>
          <li>Description: {{passagewayInfo?.description}}</li>
        </ul>
      </section>
    </article>
     </section>
  `,
  styleUrls: ['./details.component.css']
})
export class PassagewayDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  passagewayService = inject(PassagewayService);
  passagewayInfo:  PassagewayInfo| undefined;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    }
  }

  constructor() {
    const passagewayCode = this.route.snapshot.params['id'];
    this.passagewayInfo = this.passagewayService.getPassagewayByCode(passagewayCode);
  }



}
