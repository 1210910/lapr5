import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BuildingService } from '../services/building.service';



@Component({
    selector: 'app-building-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/building']">
                          <img class="brand-logo" src="/assets/logoBuilding(1).svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
          <div class="container">
              <div class="text">
                  Insert Data
              </div>
              <form action="#">
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Building Code</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Building Name</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Max length</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Max width</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data textarea">
                          <textarea rows="8" cols="80" required></textarea>
                          <br />
                          <div class="underline"></div>
                          <label for="">Description</label>
                          <br />
                          <div class="form-row submit-btn">
                              <div class="input-data">
                                  <div class="inner"></div>
                                  <a [routerLink]="['/building']"><input type="submit" value="submit" (click)="createBuilding()" > </a>
                              </div>
                          </div>
                        </div>
                    </div>
              </form>
          </div>
          </section>
  `,
    styleUrls: ["./buildingCreate.component.css"]

})

export class BuildingCreateComponent {

    buildingService: BuildingService = inject(BuildingService);

    constructor() {

    }

    public createBuilding() {

        const code = document.getElementsByTagName("input")[0].value;
        const name = document.getElementsByTagName("input")[1].value;
        const description = document.getElementsByTagName("textarea")[0].value;
        const length = Number(document.getElementsByTagName("input")[2].value);
        const width = Number(document.getElementsByTagName("input")[3].value);

        if (code == "" || name == "" || length == null || width == null || description == "") {
            alert("Please fill in all fields");
            return;
        }

        this.buildingService.createBuilding(code, name, description, length, width).then((result) => {
            alert("Building Created");

        }).catch((error) => {
            alert("Fail: " + error);
        });
    }
}
