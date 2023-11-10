import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {BuildingInfoComponent} from "./building-info/building-info.component";
import {BuildingInfo} from "./building-info/buildingInfo";
import routes from "../routes";
import { BuildingService } from '../services/building.service';


@Component({
  selector: 'app-building-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BuildingInfoComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/building']">
                          <img class="brand-logo" src="/assets/logoBuilding(1).svg" alt="logo" aria-hidden="true">
                      </a></li>
                        <li >
                      <div class="search-box">
                        <button class="btn-search" type="button" (click)="CallMethod(filter.value)"><i class="fa fa-search" aria-hidden="true"></i></button>
                        <input type="text" class="input-search" placeholder="Filter by city" #filter   >
                      </div>
                        </li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
      <app-building-info *ngFor="let BuildingInfo of buildingsList" [building]="BuildingInfo"></app-building-info>
          </section>
  `,
  styleUrls: ["./buildingCreate.component.css"]

})

export class BuildingListComponent{
  buildingsList: BuildingInfo[] = [];
  buildingService: BuildingService = inject(BuildingService);

  constructor() {
    this.buildingService.listAllBuildings().then((result) => {
      this.buildingService.buildingList(result);

      this.buildingsList = this.buildingService.BuildingList;

    }
    );
  }




  CallMethod(value: string) {
    let params: string= "";
    if (value.startsWith("min:")) {
       let  values = value.split(";");
        for (let i = 0; i < values.length; i++) {
          console.log(values[i].split(":")[1])
          params+= values[i].split(":")[1]+"/";
        }
    }

    console.log(params)
    console.log(value)



   this.buildingService.listBuildings(params).then((result) => {
        this.buildingService.buildingList(result);

        this.buildingsList = this.buildingService.BuildingList;

   });
   }



}
