import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BuildingService } from '../services/building.service';
import { BuildingInfo } from './building-info/buildingInfo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-building-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
     <section>
   <header class="brand-name">
      <nav>
         <ul class="menuItems">
            <li><a [routerLink]="['/building']">
               <img class="brand-logo" src="/assets/logoBuilding(1).svg" alt="logo" aria-hidden="true">
               </a>
            </li>
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
            <div class="input-data select-container">
               <label for="selectedBuilding">Building Code to Edit</label>
               <select [(ngModel)]="selectedBuilding" name="selectedBuilding" id="selectedBuilding">
               <option value="" disabled>Select a building</option>
               <option *ngFor="let building of this.buildings" [ngValue]="building">{{ building.code }}</option>
               </select>
               <div class="underline"></div>
            </div>
            <div class="input-data">
               <input type="text" >
               <div class="underline"></div>
               <label for="">Building Name</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input type="text" >
               <div class="underline"></div>
               <label for="">Max length</label>
            </div>
            <div class="input-data">
               <input type="text" >
               <div class="underline"></div>
               <label for="">Max width</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data textarea">
               <textarea rows="8" cols="80" ></textarea>
               <br />
               <div class="underline"></div>
               <label for="">Description</label>
               <br />
               <div class="form-row submit-btn">
                  <div class="input-data">
                     <div class="inner"></div>
                     <a [routerLink]="['/building']"><input type="submit" value="submit" (click)="editBuilding()" > </a>
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

export class BuildingEditComponent {
  buildingService: BuildingService = inject(BuildingService);
  buildings: BuildingInfo[];
  selectedBuilding: any;

  constructor() {
    this.buildings = [];
    this.listbuildings();
  }

  editBuilding() {

    const code = this.selectedBuilding.code;
    const name = document.getElementsByTagName("input")[0].value;
    const description = document.getElementsByTagName("textarea")[0].value;
    const length = Number(document.getElementsByTagName("input")[1].value);
    const width = Number(document.getElementsByTagName("input")[2].value);

    console.log("Lenght" + length)
    console.log("WITH" + width)

    const editedData: any = {};
    if (code !== "") {
      editedData['code'] = code;
    }
    if (name !== "") {
      editedData['name'] = name;
    }
    if (description !== "") {
      editedData['description'] = description;
    }
    if (length !== 0) {
      editedData['maxLength'] = length;
    }
    if (width !== 0) {
      editedData['maxWidth'] = width;
    }

    if (Object.keys(editedData).length > 0) {
      this.buildingService.editBuilding(editedData).then((result) => {
        alert("Building edited");
        console.log("Resultado : " + result)
      }).catch((err) => {
        alert("Building edition failed");
      });
    } else {
      alert("No changes to update");
    }
  }

  public listbuildings() {
    this.buildingService.listAllBuildings()
      .then((response: any) => {
        const b = JSON.parse(response);
        const buildingsArray: BuildingInfo[] = b.map((building: any) => {
          return {
            code: building.code,
            name: building.name,
            description: building.description,
            maxLength: building.maxLength,
            maxWidth: building.maxWidth
          };
        });
        this.buildings = buildingsArray;
        console.log("TGTTGGTGT")
        console.log(this.buildings)

      })
      .catch((error) => {
        console.error("Error listing buildings: ", error);
      });
  }

}
