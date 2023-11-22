import { Injectable } from '@angular/core';
import {LiftInfo} from "../Lift/lift-info/liftinfo";


@Injectable({
  providedIn: 'root'
})
export class LiftService{
  LiftList: LiftInfo[] ;

  constructor() {
    this.LiftList = [];
  }

      public createLift(code:string , floors:string[], brand:string,  model:string, buildingCode:string, serialNumber:string, description:string) {

        return new Promise((resolve, reject) => {

            const jsonMessage = JSON.stringify(
              {
                code: code,
                floors: floors,
                brand: brand,
                model: model,
                buildingCode: buildingCode,
                serialNumber: serialNumber,
                description: description
              });
            const httprequest = new XMLHttpRequest();
            httprequest.open('POST', 'http://localhost:4000/api/lift', true);
            httprequest.setRequestHeader('Content-Type', 'application/json',);
            //let response;
            httprequest.onload = function () {

              if (httprequest.status === 201) {
                console.log("Lift created");
                console.log(httprequest.responseText)
                resolve(true);
              } else {
                console.log(httprequest.responseText);
                const errorResponse = JSON.parse(httprequest.responseText);
                //response = httprequest.status;
                console.log(httprequest.responseText);
                console.log("Lift not created");
                reject(errorResponse.error);
              }
            }
            httprequest.send(jsonMessage);

          });

      }

  editLift(code: string , floorsArray: string[] , brand: string , model: string, serialNumber: string, description: string) {

    return new Promise((resolve, reject) => {

      const jsonMessage = JSON.stringify(
          {
            floors: floorsArray,
            brand: brand,
            model: model,
            serialNumber: serialNumber,
            description: description
          });
      const url = 'http://localhost:4000/api/lift/' + code;
      const httprequest = new XMLHttpRequest();
      httprequest.open('PATCH', url , true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Lift edited");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Lift not edited");
          reject(false);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  listLifts() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/lift/', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Lift listed");
          response = httprequest.response;
          resolve(response);
        } else {
          response = httprequest.status;
          console.log("Lift not listed");
          reject(false);
        }
      }
      httprequest.send();

    });
  }

  liftList(response: any) {
    const liftList = JSON.parse(response);
    this.LiftList = [];
    for (const lift of liftList) {
      this.LiftList.push({
        code: lift.code,
        buildingCode: lift.buildingCode,
        floors: lift.floors,
        brand: lift.brand,
        model: lift.model,
        serialNumber: lift.serialNumber,
        description: lift.description
      });
    }
  }

  liftListFromABuilding(response: any,buildingID: string) {
    const liftList = JSON.parse(response);
    this.LiftList = [];
    for (const lift of liftList) {
      if (lift.buildingCode === buildingID) {
        this.LiftList.push({
          code: lift.code,
          buildingCode: lift.buildingCode,
          floors: lift.floors,
          brand: lift.brand,
          model: lift.model,
          serialNumber: lift.serialNumber,
          description: lift.description
        });
      }
    }
  }
  getLiftByCode(position: string): LiftInfo | undefined{
    return this.LiftList.find((lift) => lift.code === position);
  }
  }
