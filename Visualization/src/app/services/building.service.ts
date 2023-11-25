import { Injectable } from '@angular/core';
import {BuildingInfo} from "../Building/building-info/buildingInfo";


@Injectable({
  providedIn: 'root'
})
export class BuildingService{
  buildingListInfo: BuildingInfo[] ;

  constructor() {
    this.buildingListInfo = [];
  }

  public createBuilding(code:string , name:string, description:string, maxLength:number, maxWidth:number) {

    return new Promise((resolve, reject) => {

      const jsonMessage = JSON.stringify(
        {
          code: code,
          name: name,
          description: description,
          maxLength: maxLength,
          maxWidth: maxWidth
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/buildings', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Building created");
          //response = httprequest.status;
          resolve(true);
        } else {

          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log("Building not created");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  listAllBuildings() {
    return new Promise<BuildingInfo[]>((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/buildings', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {

          response = httprequest.response;
          resolve(response);
        } else {
          response = httprequest.status;

          reject(false);
        }
      }
      httprequest.send();

    });
  }
  listBuildings(value:string) {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      const url = 'http://localhost:4000/api/buildings/'+value;
      httprequest.open('GET',url , true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
         
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
    this.buildingListInfo = [];
    for (const building of buildingsList) {
      console.log("Building: " + building)
      this.buildingListInfo.push({
        code: building.code,
          name: building.name,
          description: building.description,
          maxLength: building.maxLength,
          maxWidth: building.maxWidth
      });
    }
  }
  getBuildingByCode(position: string): BuildingInfo | undefined{
    return this.buildingListInfo.find((building) => building.code === position);
  }

  public editBuilding(editedData: { code?: string, name?: string, description?: string, maxLength?: number, maxWidth?: number }) {

    return new Promise((resolve, reject) => {

      //const filteredData = Object.fromEntries(Object.entries(editedData).filter(([_, value]) => value !== undefined));

      const jsonMessage = JSON.stringify(
        {
          name: editedData.name,
          description: editedData.description,
          maxLength: editedData.maxLength,
          maxWidth: editedData.maxWidth,
        });

      const httprequest = new XMLHttpRequest();
      httprequest.open('PATCH', 'http://localhost:4000/api/buildings/' + editedData.code, true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
      
        if (httprequest.status === 200) {
          const successResponse = JSON.parse(httprequest.responseText);
          console.log(successResponse);
          resolve(true);
        } else {
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log("Building not edited");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }


}

