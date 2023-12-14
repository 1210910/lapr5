import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor() {
    }

    public createUser(firstName: string, lastName: string, email: string, phoneNumber: number, NIF: number, password: string, role: string) {

        return new Promise((resolve, reject) => {

            const jsonMessage = JSON.stringify(
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phoneNumber,
                    NIF: NIF,
                    password: password,
                    role: role
                });
            const httprequest = new XMLHttpRequest();
            httprequest.open('POST', 'http://localhost:4000/api/auth/signup', true);
            httprequest.setRequestHeader('Content-Type', 'application/json',);
            //let response;
            httprequest.onload = function () {

                if (httprequest.status === 201) {
                    console.log("User created");
                    //response = httprequest.status;
                    resolve(true);
                } else {

                    const errorResponse = JSON.parse(httprequest.responseText);
                    //response = httprequest.status;
                    console.log(jsonMessage);
                    console.log("User not created");
                    reject(errorResponse.error);
                }
            }
            httprequest.send(jsonMessage);

        });
    }


}