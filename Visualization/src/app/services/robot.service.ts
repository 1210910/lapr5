import { Injectable } from "@angular/core";
import { Robotinfo } from "../Robot/robot-info/robotinfo";

@Injectable({
  providedIn: "root"
})

export class RobotService {
  RobotList: Robotinfo[];

  constructor() {
    this.RobotList = [];
  }

  createRobot(code: string, name: string, type: string, description: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        code: code,
        name: name,
        type: type,
        enabled: true,
        description: description
      });
      const httprequest = new XMLHttpRequest();
      httprequest.open("POST", "http://localhost:4000/api/robot", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      let response;
      httprequest.onload = function() {
        if (httprequest.status === 201) {
          console.log("Robot created");
          response = httprequest.status;
          resolve(true);
        } else {
          response = httprequest.status;
          console.log("Robot not created");
          reject(false);
        }
      };
      httprequest.send(jsonMessage);
    });
  }

  listAllRobots() {
    return new Promise<Robotinfo[]>((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/robot', true);
      httprequest.setRequestHeader('Content-Type', 'application/json');
      let response;
  
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Robot listed");
          response = httprequest.response;
          // Parse do JSON para um array de Robotinfo
          const robotInfoArray: Robotinfo[] = JSON.parse(response);
          resolve(robotInfoArray);
        } else {
          console.log(httprequest.response)
          response = httprequest.status;
          console.log("Robot not listed");
          reject(false);
        }
      }
  
      httprequest.send();
    });
  }

  toggleRobotStatus(code:string , enabled:boolean) {

    return new Promise((resolve, reject) => {
      const change = !enabled
      console.log(change);
      const jsonPatch = [
        { op: 'replace', path: '/enabled', value: change }
      ];

      const url = 'http://localhost:4000/api/robot/' + code;
      const httprequest = new XMLHttpRequest();
      httprequest.open('PATCH', url , true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      let response;
      httprequest.onload = function () {

        if (httprequest.status === 204) {
          console.log("Robot status edited");
          response = httprequest.status;
          resolve(true);
        } else {
          console.error(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          reject(errorResponse);
        }
      }
      httprequest.send(JSON.stringify(jsonPatch));

    });
  }
}
