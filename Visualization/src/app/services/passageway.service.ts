import { Injectable } from "@angular/core";
import { PassagewayInfo } from "../PassageWay/passageway-info/passagewayinfo";

@Injectable({
  providedIn: "root"
})

export class PassagewayService {
  PassagewayList: PassagewayInfo[];

  constructor() {
    this.PassagewayList = [];
  }

  createPassageway(passageCode: string, floor1: string, floor2: string, description: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        passageCode: passageCode,
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
          reject(false);
        }
      };
      httprequest.send(jsonMessage);
    });
  }

  editPassageway(passageCode: string, newPassageCode: string, floor1: string, floor2: string, description: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        passageCode: newPassageCode,
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
          reject(false);
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
          response = httprequest.status;
          resolve(response);
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

}
