import { Injectable } from '@angular/core';
import {BuildingInfo} from "../Building/building-info/buildingInfo";


@Injectable({
  providedIn: 'root'
})
export class BuildingService{
  BuildingList: BuildingInfo[] ;

  constructor() {
    this.BuildingList = [];
  }

  createBuilding(code:string , number:number, length:number, width:number, description:string, buildingID:string) {

    return new Promise((resolve, reject) => {

      const jsonMessage = JSON.stringify(
        {
          code: code,
          name: number,
          description: length,
          maxLength: width,
          maxWidth: description
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/buildings', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Building created");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Building not created");
          reject(false);
        }
      }
      httprequest.send(jsonMessage);


    });
  }
 
  listBuildings() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/buildings', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Building listed");
          response = httprequest.response;
          resolve(response);
        } else {
          response = httprequest.status;
          console.log("Building not listed");
          reject(false);
        }
      }
      httprequest.send();

    });
  }


  buildingList(response: any) {
    const buildingsList = JSON.parse(response);
    this.BuildingList = [];
    for (const building of buildingsList) {
      this.BuildingList.push({
        code: building.code,
          name: building.name,
          description: building.description,
          maxLength: building.maxLength,
          maxWidth: building.maxWidth
      });
    }
  }
  getBuildingByCode(position: string): BuildingInfo | undefined{
    return this.BuildingList.find((building) => building.code === position);
  }



}

