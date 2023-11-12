import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class LoaderService {


  constructor() {

  }

  load(code: string, rooms: string, lift: string) {
    return new Promise((resolve, reject) => {

      let room: string="";




      for (let i = 0; i < rooms.split(";").length; i++) {
        room+= JSON.stringify({
          roomCode: rooms.split(";")[i].split(",")[0],
          positionX: Number(rooms.split(";")[i].split(",")[1]),
          positionY: Number(rooms.split(";")[i].split(",")[2])
        })
      }







      const jsonMessage = JSON.stringify({
        floorCode: code,
        rooms: [JSON.parse(room)],
        elevator:[{
          elevatorCode: lift.split(",")[0],
          positionX: Number(lift.split(",")[1]),
          positionY: Number(lift.split(",")[2])
        }]
      });
      console.log(jsonMessage)
      const httprequest = new XMLHttpRequest();
      httprequest.open("POST", "http://localhost:4000/api/floorMap", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      httprequest.onload = function() {
        if (httprequest.status === 201) {
          console.log("Robot created");
          resolve(true);
        } else {
          console.log("Robot not created");
          reject(false);
        }
      };
      httprequest.send(jsonMessage);
    });
  }
}
