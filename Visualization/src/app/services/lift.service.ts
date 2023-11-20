import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })

  export class LiftService{


    constructor() {
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

  }
