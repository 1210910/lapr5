import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { LoaderService } from "../services/loader.service";


@Component({
  selector: "app-view-map",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/campus']">
              <img class="brand-logo" src="/assets/logoCampus.svg" alt="logo" aria-hidden="true">
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
              <label for="">FloorCode</label>
            </div>
          </div>
          <div class="form-row">
            <div class="input-data textarea">
              <div class="form-row submit-btn">
                <div class="input-data">
                  <div class="inner"></div>
                  <input type="button" value="submit" (click)="view()">
                  <div *ngIf="isLoading">Loading...</div>
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

export class ViewMapComponent {
  loaderService: LoaderService = inject(LoaderService);
  url: string = "";
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  isLoading: boolean = false;


  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    }
  }

  constructor() {

  }


  async view() {
    const code = (document.getElementsByTagName("input")[0] as HTMLInputElement).value;
    this.isLoading = true; // Set isLoading to true to indicate the loading process

    try {
      // @ts-ignore
      this.url = await this.loaderService.view(code);

      if (this.url != "") {
        this.url = "./../../assets/mazes/" + code + ".json";
        this.router.navigate(["/plant"], { queryParams: { url: this.url } });
      } else {
        alert("Map not loaded");
      }
    } catch (error) {
      alert("Error occurred while fetching data");
    } finally {
      this.isLoading = false; // Set isLoading to false regardless of success or failure
    }
  }

}
