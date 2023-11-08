import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class FloorService{
  constructor() {
  }

  createFloor(code:string , number:number, length:number, width:number, description:string, buildingID:string){

    const jsonMessage= JSON.stringify(
        {floorCode:code,
          floorNumber:number,
          length:length,
          width:width,
          description:description,
          buildingID:buildingID});
    const httprequest= new XMLHttpRequest();
    httprequest.open('POST', 'http://localhost:4000/api/floor', true);
    httprequest.setRequestHeader('Content-Type', 'application/json');
    httprequest.send(jsonMessage);

    httprequest.getResponseHeader('Content-Type');
    if (httprequest.status == 201) {
      return true;
    } else {
      return false;
    }


  }

}

