import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor() {
  }

  public createUser(firstName: string, lastName: string, email: string, phoneNumber: number, NIF: number, password: string, role: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        nif: NIF,
        password: password,
        role: role
      });

      const httprequest = new XMLHttpRequest();
      httprequest.open("POST", "http://localhost:4000/api/auth/signup", true);
      httprequest.setRequestHeader("Content-Type", "application/json");

      httprequest.onload = function() {
        if (httprequest.status === 201) {
          const auth0Body = {
            client_id: "Sk0nEcUzFPLnFEdOx9QxkwEMNZ4yZP3N",
            email: email,
            password: password,
            connection: "Username-Password-Authentication"
          };

          const httpRequestAuth0 = new XMLHttpRequest();
          httpRequestAuth0.open("POST", "https://dev-3hnosuh6oycbgons.us.auth0.com/dbconnections/signup", true);
          httpRequestAuth0.setRequestHeader("Content-Type", "application/json");

          httpRequestAuth0.onload = () => {
            if (httpRequestAuth0.status === 201) {
              console.log("User created in Auth0");
              resolve(true);
            } else {
              console.log("User not created in Auth0");
              reject("Failed to create user in Auth0");
              return;
            }
          };

          httpRequestAuth0.onload = () => {
            if (((httpRequestAuth0.status / 100) | 0) === 2) {
              resolve(JSON.parse(httpRequestAuth0.response));
            } else {
              reject(httpRequestAuth0.response);
            }
          };

          console.log(JSON.stringify(auth0Body));
          httpRequestAuth0.send(JSON.stringify(auth0Body));
        } else {
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log("User not created locally");
          reject(errorResponse.error);
        }
      };

      httprequest.onerror = () => {
        console.log("Error creating user locally");
        reject("Error creating user locally");
      };

      httprequest.send(jsonMessage);
    });
  }

  public profile() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open("GET", "http://localhost:4000/api/auth/profile/", true);
      httprequest.setRequestHeader("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) httprequest.setRequestHeader("Authorization", `Bearer ${token}`);
      httprequest.onload = function() {
        if (httprequest.status === 200) {
          const response = JSON.parse(httprequest.responseText);
          resolve(response);
        } else {
          const errorResponse = JSON.parse(httprequest.responseText);
          reject(errorResponse.error);
        }
      };
      httprequest.send();
    });
  }


}