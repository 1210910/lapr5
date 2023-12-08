import { Injectable } from "@angular/core";
import { PassagewayInfo } from "../PassageWay/passageway-info/passagewayinfo";
import { FloorInfo } from "../Floor/floor-info/floorinfo";

@Injectable({
  providedIn: "root"
})

export class PassagewayService {
  PassagewayList: PassagewayInfo[];

  constructor() {
    this.PassagewayList = [];
  }

  createPassageway(floor1: string, floor2: string, description: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        floor1: floor1,
        floor2: floor2,
        description: description
      });
      const httprequest = new XMLHttpRequest();
      httprequest.open("POST", "http://localhost:4000/api/passageway", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      let response;
      httprequest.onload = function() {
        if (httprequest.status === 201) {
          console.log("Passageway created");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Passageway not created");
          reject(httprequest.responseText);
        }
      };
      httprequest.send(jsonMessage);
    });
  }

  editPassageway(passageCode: string, floor1: string, floor2: string, description: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        floor1: floor1,
        floor2: floor2,
        description: description
      });
      const httprequest = new XMLHttpRequest();
      httprequest.open("PATCH", ("http://localhost:4000/api/passageway" + "/" + passageCode), true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      let response;
      httprequest.onload = function() {
        if (httprequest.status === 200) {
          console.log("Passageway edited");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Passageway not edited");
          reject(httprequest.responseText);
        }
      };
      httprequest.send(jsonMessage);
    });
  }

  listPassageways() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open("GET", "http://localhost:4000/api/passageway", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      let response;
      httprequest.onload = function() {
        if (httprequest.status === 200) {
          console.log("Passageway listed");
          resolve(httprequest.response);
        } else {
          response = httprequest.status;
          console.log("Passageway not listed");
          reject(false);
        }
      };
      httprequest.send();
    });
  }

  passagewayList(response: any) {
    const passagewayList = JSON.parse(response);
    this.PassagewayList = [];
    for (const passageway of passagewayList) {
      this.PassagewayList.push({
        passageCode: passageway.passageCode,
        floor1: passageway.floor1,
        floor2: passageway.floor2,
        description: passageway.description
      })
    }
  }

  passagewayListBetween2Buldings(response: any, floorInfo: FloorInfo[], building1: string, building2: string){
    const passagewayList = JSON.parse(response);
    this.PassagewayList = [];
    for (const passageway of passagewayList) {
        const b1 = floorInfo.find((floor) => floor.floorCode === passageway.floor1)?.buildingID;
        const b2 = floorInfo.find((floor) => floor.floorCode === passageway.floor2)?.buildingID;
        if ((building1 == b1 && building2 == b2) || (building1 == b2 && building2 == b1)) {
          this.PassagewayList.push({
            passageCode: passageway.passageCode,
            floor1: passageway.floor1,
            floor2: passageway.floor2,
            description: passageway.description
          })
        }
    }
  }

  passagewayListFromABuilding(response: any, floorInfo: FloorInfo[], building: string){
    const passagewayList = JSON.parse(response);
    this.PassagewayList = [];
    for (const passageway of passagewayList) {
      const b1 = floorInfo.find((floor) => floor.floorCode === passageway.floor1)?.buildingID;
      const b2 = floorInfo.find((floor) => floor.floorCode === passageway.floor2)?.buildingID;
      if (building == b1 || building == b2) {
        this.PassagewayList.push({
          passageCode: passageway.passageCode,
          floor1: passageway.floor1,
          floor2: passageway.floor2,
          description: passageway.description
        })
      }
    }
  }

  passagewayListFromAFloor(response: any, floor: string){
    const passagewayList = JSON.parse(response);
    this.PassagewayList = [];
    for (const passageway of passagewayList) {
      if (passageway.floor1 == floor || passageway.floor2 == floor) {
        this.PassagewayList.push({
          passageCode: passageway.passageCode,
          floor1: passageway.floor1,
          floor2: passageway.floor2,
          description: passageway.description
        })
      }
    }
  }

  getPassagewayByCode(code: string): PassagewayInfo | undefined{
    return this.PassagewayList.find((passageway) => passageway.passageCode === code);
  }

}
