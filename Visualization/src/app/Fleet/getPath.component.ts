import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LoaderService} from "../services/loader.service";
import {PlanningService} from "../services/planning.service";
import * as jsdom from "jsdom";

@Component({
  selector: 'app-building-create',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/fleet']">
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
                          <label for="">Room Origin</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Room Destination</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" >
                          <div class="underline"></div>
                          <label for="">Building Path</label>
                      </div>
                  </div>
                <div class="form-row">
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">Floor Path</label>
                  </div>
                </div>

                  <div class="form-row">
                    <div class="input-data textarea">
                      <textarea rows="10" cols="80" ></textarea>
                      <br />
                      <div class="underline"></div>
                      <label for="">Path</label>
                      <br />
                      <div class="form-row submit-btn">
                        <div class="input-data">
                          <div class="inner"></div>
                          <input type="button" value="submit" (click)="load()" >
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

export class GetPathComponent{
  planningService: PlanningService= inject(PlanningService);
    isLoading: boolean = false;
  constructor() {

  }



  async load(){

     const room1 = document.getElementsByTagName("input")[0].value;
      const room2 = document.getElementsByTagName("input")[1].value;
      this.isLoading = true;
      try {
           // @ts-ignore
            const result = await this.planningService.getPath(room1,room2);

            if (result != "") {
              alert(JSON.stringify(result));

              // tirar as duas primeiras linhas do result antes de fazer o parse  (result = result.substring(2);)

              // @ts-ignore
              const resultString:string = result;
              const index = resultString.indexOf('{');
              resultString.substring(index);

              console.log (index);
              console.log (resultString.substring(index));

              // @ts-ignore
              const obj = JSON.parse(resultString.substring(index));



              const path = obj.path;
              const building = obj.building;
              const floor = obj.floor;

                document.getElementsByTagName("input")[2].value = JSON.stringify(building);
                document.getElementsByTagName("input")[3].value = JSON.stringify(floor);
                document.getElementsByTagName("textarea")[0].value = JSON.stringify(path);
            } else {
                alert(result);
            }
        }catch (e) {
            alert(e);
        } finally {
            this.isLoading = false;
      }




  }

}
