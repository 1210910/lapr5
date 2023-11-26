import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlanningService{

  constructor() {
  }


  public getPath(room1:string,room2:string) {
    return new Promise((resolve, reject) => {

      const url = 'http://localhost:8000/rooms?param1='+room1+'&param2='+room2 ;
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', url, true);

      //let response;
      httprequest.onload = function () {

        resolve(httprequest.responseText);

      }
      httprequest.send();

    });
  }
}
