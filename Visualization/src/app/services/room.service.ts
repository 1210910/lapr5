import { Injectable } from '@angular/core';
import { RoomInfo } from '../Room/Room-info/roominfo'


@Injectable({
    providedIn: 'root'
})
export class RoomService {
    RoomList: RoomInfo[];

    constructor() {
        this.RoomList = [];
    }

    public createRoom(roomCode: string, floor: string, description: string, width: number, length: number, roomType: string) {

        return new Promise((resolve, reject) => {

            const jsonMessage = JSON.stringify(
                {
                    roomCode: roomCode,
                    description: description,
                    width: width,
                    length: length,
                    roomType: roomType
                });
            const httprequest = new XMLHttpRequest();
            httprequest.open('POST', 'http://localhost:4000/api/room/' + floor , true);
            httprequest.setRequestHeader('Content-Type', 'application/json',);
            const token = localStorage.getItem("token");
            if (token) httprequest.setRequestHeader("Authorization", `Bearer ${token}`);
            //let response;
            httprequest.onload = function () {

                if (httprequest.status === 201) {
                    console.log("Room created");
                    console.log(httprequest.responseText)
                    resolve(true);
                } else {
                    console.log(httprequest.responseText);
                    const errorResponse = JSON.parse(httprequest.responseText);
                    //response = httprequest.status;
                    console.log(httprequest.responseText);
                    console.log("Room not created");
                    reject(errorResponse.error);
                }
            }
            httprequest.send(jsonMessage);

        });

    }

    public getRooms() {
        return new Promise((resolve, reject) => {
            const httprequest = new XMLHttpRequest();
            httprequest.open('GET', 'http://localhost:4000/api/room', true);
            httprequest.setRequestHeader('Content-Type', 'application/json');
            httprequest.onload = function () {
                if (httprequest.status === 200) {
                    const roomList = JSON.parse(httprequest.response);
                    resolve(httprequest.response);
                } else {
                    const errorResponse = JSON.parse(httprequest.responseText);
                    reject(errorResponse.error);
                }
            }
            httprequest.send();
        });
    }

    roomList(response: any) {
        const floorList = JSON.parse(response);
        this.RoomList = [];
        for (const room of floorList) {
            this.RoomList.push({
                roomCode: room.roomCode,
                floor: room.floor,
                description: room.description,
                width: room.width,
                length: room.length,
                roomType: room.roomType
            });
        }
    }

    getRoomByCode(position: string): RoomInfo | undefined{
        return this.RoomList.find((room) => room.roomCode === position);
    }
}
