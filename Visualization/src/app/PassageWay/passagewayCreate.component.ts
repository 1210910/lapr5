import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../services/passageway.service";

@Component({
  selector: "app-passageway-create",
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      <div class="container">
        <div class="text">
          Insert Data
        </div>
        <form action="#">
          <div class="form-row">
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Passage Code</label>
            </div>
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Floor 1</label>
            </div>
          </div>
          <div class="form-row">
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Floor 2</label>
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
                  <a [routerLink]="['/passageway']"><input type="submit" value="submit" (click)="createPassageway()"> </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  `,
  styleUrls: ["./passagewayCreate.component.css"]

})

export class PassagewayCreateComponent {
  passagewayService: PassagewayService = inject(PassagewayService);

  constructor() {
  }

  createPassageway() {
    const passageCode = document.getElementsByTagName("input")[0].value;
    const floor1 = document.getElementsByTagName("input")[1].value;
    const floor2 = document.getElementsByTagName("input")[2].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    if (passageCode == "" || floor1 == "" || floor2 == "" || description == "") {
      alert("Please fill in all fields");
      return;

    }
    this.passagewayService.createPassageway(passageCode, floor1, floor2, description).then(() => {

      alert("Passageway created");

    }).catch(() => {
      alert("Passageway not created");
    });

  }

}
