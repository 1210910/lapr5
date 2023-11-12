import { Injectable } from "@angular/core";
import { Robotinfo } from "../Robot/robot-info/robotinfo";

@Injectable({
  providedIn: "root"
})

export class RobotTypeService {


  constructor() {

  }

  createRobotType(code: string, brand: string, model: string, taskType:string, description: string) {
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
}
