import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class LoaderService {


  constructor() {

  }

  load(code: string, file: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('floorCode', code); // Append floorCode

      if (file) {
        formData.append('file', file); // Append file
      }

      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/floorMap', true);

      httprequest.onload = function () {
        if (httprequest.status === 201) {
          console.log('Success: File uploaded');
          resolve(true);
        } else {
          console.log('Error: File upload failed');
          reject(false);
        }
      };

      httprequest.onerror = function () {
        console.error('Error: There was a problem with the request');
        reject(false);
      };

      httprequest.send(formData); // Send the form data (including the file)
    });
  }
}
