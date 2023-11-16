import { Injectable } from '@angular/core';
import {FloorInfo} from "../Floor/floor-info/floorinfo";
import { PassagewayInfo } from "../PassageWay/passageway-info/passagewayinfo";




@Injectable({
  providedIn: 'root'
})
export class FloorService{
  FloorList: FloorInfo[] ;

  constructor() {
    this.FloorList = [];
  }





  createFloor(code:string , number:number, length:number, width:number, description:string, buildingID:string) {

    return new Promise((resolve, reject) => {

      const jsonMessage = JSON.stringify(
        {
          floorCode: code,
          floorNumber: number,
          length: length,
          width: width,
          description: description,
          buildingID: buildingID
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/floor', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Floor created");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Floor not created");
          reject(false);
        }
      }
      httprequest.send(jsonMessage);


    });
  }
  editFloor(code:string , number:number, length:number, width:number, description:string) {

    return new Promise((resolve, reject) => {

      const jsonMessage = JSON.stringify(
        {
          floorNumber: number,
          length: length,
          width: width,
          description: description,
        });
      const url = 'http://localhost:4000/api/floor/' + code;
      const httprequest = new XMLHttpRequest();
      httprequest.open('PATCH', url , true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Floor edited");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Floor not edited");
          reject(false);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  listFloors() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/floor', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Floor listed");
          response = httprequest.response;
          resolve(response);
        } else {
          response = httprequest.status;
          console.log("Floor not listed");
          reject(false);
        }
      }
      httprequest.send();

    });
  }


  floorList(response: any) {
    const floorList = JSON.parse(response);
    this.FloorList = [];
    for (const floor of floorList) {
      this.FloorList.push({
        floorCode: floor.floorCode,
        floorNumber: floor.floorNumber,
        length: floor.length,
        width: floor.width,
        description: floor.description,
        buildingID: floor.buildingID
      });
    }
  }

  floorListWithPassagewaysFromABuilding(passagewayInfo: PassagewayInfo[], buildingID: string) {
    const floorList = [];

    for (const passageway of passagewayInfo) {
      const floor = this.getFloorByCode(passageway.floor1);
      if (floor?.buildingID === buildingID) {
        floorList.push
        ({
          floorCode: floor.floorCode,
          floorNumber: floor.floorNumber,
          length: floor.length,
          width: floor.width,
          description: floor.description,
          buildingID: floor.buildingID
        });
      }
      else {
        const floor = this.getFloorByCode(passageway.floor2);
        if (floor?.buildingID === buildingID) {
          floorList.push
          ({
            floorCode: floor.floorCode,
            floorNumber: floor.floorNumber,
            length: floor.length,
            width: floor.width,
            description: floor.description,
            buildingID: floor.buildingID
          });
        }
      }
    }
    this.FloorList = floorList;
  }


  getFloorByCode(position: string): FloorInfo | undefined{
    return this.FloorList.find((floor) => floor.floorCode === position);
  }



}

