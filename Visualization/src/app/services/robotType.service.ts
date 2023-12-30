import { Injectable } from "@angular/core";
import { RobotInfo } from "../Robot/robot-info/robotinfo";

@Injectable({
  providedIn: "root"
})

export class RobotTypeService {


  constructor() {

  }

  createRobotType(code: string, brand: string, model: string, taskType: string, description: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        code: code,
        brand: brand,
        model: model,
        description: description,
        taskTypeCode: taskType
      });
      const httprequest = new XMLHttpRequest();
      httprequest.open("POST", "http://localhost:4000/api/robotType", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) httprequest.setRequestHeader("Authorization", `Bearer ${token}`);
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

  listRobotTypes() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open("GET", "http://localhost:4000/api/robotType", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) httprequest.setRequestHeader("Authorization", `Bearer ${token}`);
      httprequest.onload = function() {
        if (httprequest.status === 200) {
          console.log("Robot types listed");
          resolve(httprequest.response);
        } else {
          console.log("Robot types not listed");
          reject(false);
        }
      };
      httprequest.send();
    });
  }
}
