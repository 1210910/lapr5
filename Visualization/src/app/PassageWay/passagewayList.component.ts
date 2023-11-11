import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import { PassagewayService } from "../services/passageway.service";
import { PassagewayInfoComponent } from "./passageway-info/passageway-info.component";
import { PassagewayInfo } from "./passageway-info/passagewayinfo";

@Component({
  selector: 'app-passageway-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PassagewayInfoComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/passageway']">
                          <img class="brand-logo" src="/assets/logoPassageway.svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
        <app-passageway-info *ngFor="let passagewayInfo of passagewayList" [passagewayInfo]="passagewayInfo">
        </app-passageway-info>
      </section>
  `,
  styleUrls: ["./passagewayCreate.component.css"]

})

export class PassagewayListComponent {
  passagewayList: PassagewayInfo[] = [];
  passagewayService: PassagewayService = inject(PassagewayService);

  constructor() {
    this.passagewayService.listPassageways().then((result) => {
        this.passagewayService.passagewayList(result);

        this.passagewayList = this.passagewayService.PassagewayList;

      }
    );

  }

}
