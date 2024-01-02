import { Injectable } from '@angular/core';
import { TaskInfo } from '../Task/TaskManager/TaskInfo/TaskInfo'
import {VigilanceTaskInfo} from "../Task/TaskManager/TaskInfo/VigilanceTaskInfo";
import {DeliveryInfoComponent} from "../Task/TaskManager/TaskInfo/delivery-info.component";
import {DeliveryTaskInfo} from "../Task/TaskManager/TaskInfo/DeliveryTaskInfo";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  TaskList: TaskInfo[];
  VigilanceList: VigilanceTaskInfo[];
  DeliveryList: DeliveryTaskInfo[];

  constructor() {
    this.TaskList = [];
    this.VigilanceList = [];
    this.DeliveryList = [];

  }

  public getPath(tasks: string) {
    return new Promise((resolve, reject) => {

      const url = 'http://localhost:8000/orderPath?param1='+tasks ;
      console.log(url);
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', url, true);

      //let response;
      httprequest.onload = function () {

        resolve(httprequest.responseText);

      }
      httprequest.send();

    });
  }

  public getPathGenetic(tasks: string) {
    return new Promise((resolve, reject) => {

      const url = 'http://localhost:8000/orderPathGenetic?param1='+tasks ;
      console.log(url);
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', url, true);

      //let response;
      httprequest.onload = function () {

        resolve(httprequest.responseText);

      }
      httprequest.send();

    });
  }

  public startDeliveryTask(id: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify(
        {
          id: id
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/deliveryTasks/start', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Task started");
          console.log(httprequest.response)
          resolve(true);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log(httprequest.responseText);
          console.log("Task not started");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  public startVigilanceTask(id: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify(
          {
            id: id
          });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/vigilanceTasks/start', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Task started");
          console.log(httprequest.response)
          resolve(true);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log(httprequest.responseText);
          console.log("Task not started");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }


  public createVigilanceTask( origRoom: string, destRoom: string, requestName: string, requestNumber:string, description: string) {

    return new Promise((resolve, reject) => {

      const token = localStorage.getItem("token");

      // Verifique se o token existe
      if (!token) {
        console.error("Token not found. Cannot make the request.");
        reject("Token not found");
        return;
      }else {
        console.log("token: "+ token)
      }


      const jsonMessage = JSON.stringify(
        {
          roomOrig: origRoom,
          roomDest: destRoom,
          requestName: requestName,
          requestNumber: requestNumber,
          description:description
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/vigilanceTasks' , true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.setRequestHeader("Authorization", `Bearer ${token}`);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          const response = JSON.parse(httprequest.response)
          console.log(httprequest.response)
          resolve(response as VigilanceTaskInfo);
        } else {
          console.log(httprequest.response);
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


  public createDeliveryTask(origName: string, destName: string, origPhoneNumber: string, destPhoneNumber: string, origRoom: string, destRoom: string, description: string, confirmationCode: string) {

    return new Promise((resolve, reject) => {

      const token = localStorage.getItem("token");

      // Verifique se o token existe
      if (!token) {
        console.error("Token not found. Cannot make the request.");
        reject("Token not found");
        return;
      }
      const jsonMessage = JSON.stringify(
        {
          origName: origName,
          destName: destName,
          origPhoneNumber: origPhoneNumber,
          destPhoneNumber: destPhoneNumber,
          roomOrig: origRoom,
          roomDest: destRoom,
          confirmationCode: confirmationCode,
          description: description
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/deliveryTasks' , true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.setRequestHeader("Authorization", `Bearer ${token}`);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log(httprequest.response)
          const response = JSON.parse(httprequest.response)
          resolve(response as DeliveryTaskInfo);
        } else {
          const errorResponse = JSON.parse(httprequest.responseText);
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });

  }

  public getAcceptedTasks() {
    return new Promise((resolve, reject) => {
        const httprequest = new XMLHttpRequest();
        httprequest.open('GET', 'http://localhost:4000/api/taskRequest/accepted', true);
        httprequest.setRequestHeader('Content-Type', 'application/json',);
        httprequest.onload = function () {
            if (httprequest.status === 200) {
            console.log("Tasks retrieved");
            console.log(httprequest.responseText)
            resolve(httprequest.response);
            } else {
            console.log(httprequest.responseText);
            const errorResponse = JSON.parse(httprequest.responseText);
            console.log(httprequest.responseText);
            console.log("Tasks not retrieved");
            reject(errorResponse.error);
            }
        }
        httprequest.send();
    });
  }

  public getVigilanceTasks() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/vigilanceTasks/tasks', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Vigilance Tasks retrieved");
          console.log(httprequest.responseText)
          resolve(httprequest.response);
        } else {
          console.log(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Vigilance Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public getDeliveryTasks() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/deliveryTasks/tasks', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Delivery Tasks retrieved");
          console.log(httprequest.responseText)
          resolve(httprequest.response);
        } else {
          console.log(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Delivery Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public async getAllTasks() {
    await this.getDeliveryTasks().then( (response: any) => {
        const responseJson = JSON.parse(response);
        const tasksArray: TaskInfo[] = responseJson.map((task: any) => {
          return {
            id: task.id,
            description: task.description,
            user: task.user,
            roomDest: task.roomDest,
            roomOrig: task.roomOrig,
            robotId: task.robotId,
            state: task.state
          };
        });
        this.TaskList.push(...tasksArray);
      }
    ).catch((error) => {
      console.error("Error listing tasks", error);
    });
    await this.getVigilanceTasks().then( (response: any) => {
        const responseJson = JSON.parse(response);
        const tasksArray: TaskInfo[] = responseJson.map((task: any) => {
          return {
            id: task.id,
            description: task.description,
            user: task.user,
            roomDest: task.roomDest,
            roomOrig: task.roomOrig,
            robotId: task.robotId,
            state: task.state
          };
        });
        this.TaskList.push(...tasksArray);
      }
    ).catch((error) => {
        console.error("Error listing tasks", error);
      }
    );
    return this.TaskList;
  }

  public getVigilanceTaskRequests() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/vigilanceTasks', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Vigilance Tasks retrieved");
          console.log(httprequest.responseText)
          const responseJson = JSON.parse(httprequest.response);
          resolve(responseJson);
        } else {
          console.log(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Vigilance Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public getDeliveryTaskRequests() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/deliveryTasks', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Delivery Tasks retrieved");
          const responseJson = JSON.parse(httprequest.response);
          resolve(responseJson);
        } else {
         const errorResponse = JSON.parse(httprequest.responseText);
          console.log("Delivery Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public getAllPendingTasks() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/deliveryTasks/pending', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Tasks retrieved");
          console.log(httprequest.responseText)
          resolve(httprequest.response);
        } else {
          console.log(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public  allPendingTaskRequests2() {
     this.getAllPendingDeliveryTaskRequests().then( (response: any) => {
        const responseJson = JSON.parse(response);
        const tasksArray: TaskInfo[] = responseJson.map((task: any) => {
            return {
            id: task.id,
            description: task.description,
            user: task.user,
            roomDest: task.roomDest,
            roomOrig: task.roomOrig,
            state: task.state
            };
        });
        this.TaskList.push(...tasksArray);
     }
        ).catch((error) => {
            console.error("Error listing tasks", error);
        });
     this.getAllPendingVigilanceTaskRequests().then( (response: any) => {
            const responseJson = JSON.parse(response);
            const tasksArray: TaskInfo[] = responseJson.map((task: any) => {
                return {
                  id: task.id,
                  description: task.description,
                  user: task.user,
                  roomDest: task.roomDest,
                  roomOrig: task.roomOrig,
                  state: task.state
                };
            });
            this.TaskList.push(...tasksArray);
        }
    ).catch((error) => {
            console.error("Error listing tasks", error);
        }
    );
     return this.TaskList;
  }

  public getAllPendingVigilanceTaskRequests() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/vigilanceTasks/requestpending', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Tasks retrieved");
          console.log(httprequest.responseText)
          resolve(httprequest.response);
        } else {
          console.log(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public getAllPendingDeliveryTaskRequests() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      httprequest.open('GET', 'http://localhost:4000/api/deliveryTasks/requestpending', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      httprequest.onload = function () {
        if (httprequest.status === 200) {
          console.log("Tasks retrieved");
          console.log(httprequest.responseText)
          resolve(httprequest.response);
        } else {
          console.log(httprequest.responseText);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Tasks not retrieved");
          reject(errorResponse.error);
        }
      }
      httprequest.send();
    });
  }

  public approveDeliveryTask(id: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify(
        {
          id: id
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/deliveryTasks/approve', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Task approved");
          console.log(httprequest.response)
          resolve(true);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log(httprequest.responseText);
          console.log("Task not approved");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  public rejectDeliveryTask(id: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify(
        {
          id: id
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/deliveryTasks/reject', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Task rejected");
          console.log(httprequest.response)
          resolve(true);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log(httprequest.responseText);
          console.log("Task not rejected");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  public taskType(id: string) {

    if ( this.VigilanceList.find(x => x.id === id) != null) {
      return "VIGILANCE";
    }else if ( this.DeliveryList.find(x => x.id === id) != null) {
        return "DELIVERY";
    }

    return "NONE";

  }

  public approveVigilanceTask(id: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify(
        {
          id: id
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/vigilanceTasks/approve', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Task approved");
          console.log(httprequest.response)
          resolve(true);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log(httprequest.responseText);
          console.log("Task not approved");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  public rejectVigilanceTask(id: string) {
    return new Promise((resolve, reject) => {
      const jsonMessage = JSON.stringify(
        {
          id: id
        });
      const httprequest = new XMLHttpRequest();
      httprequest.open('POST', 'http://localhost:4000/api/vigilanceTasks/reject', true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 201) {
          console.log("Task rejected");
          console.log(httprequest.response)
          resolve(true);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          //response = httprequest.status;
          console.log(httprequest.responseText);
          console.log("Task not rejected");
          reject(errorResponse.error);
        }
      }
      httprequest.send(jsonMessage);

    });
  }

  public getDeliveryFilteredTasks(state: string, user:string) {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest()
      const url = `http://localhost:4000/api/deliveryTasks/filtered?state=${encodeURIComponent(state)}&user=${encodeURIComponent(user)}`;
      httprequest.open('GET', url, true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Tasks Received");

          const responseJson = JSON.parse(httprequest.response);
          console.log(responseJson);
          resolve(responseJson);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Task not received");
          reject(errorResponse.error);
        }
      }
      httprequest.send();

    });
  }

  public allPendingTaskRequests() {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      const url = `http://localhost:4000/api/taskRequest/pending`;

      httprequest.open('GET', url, true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Tasks Received");
          console.log(httprequest.response)
          const responseJson = JSON.parse(httprequest.response);
          resolve(responseJson);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Error");
          reject(errorResponse.error);
        }
      }
      httprequest.send();

    });
  }


  public getVigilanceFilteredTasks(state: string, user:string) {
    return new Promise((resolve, reject) => {
      const httprequest = new XMLHttpRequest();
      const url = `http://localhost:4000/api/vigilanceTasks/filtered?state=${encodeURIComponent(state)}&user=${encodeURIComponent(user)}`;

      httprequest.open('GET', url, true);
      httprequest.setRequestHeader('Content-Type', 'application/json',);
      //let response;
      httprequest.onload = function () {

        if (httprequest.status === 200) {
          console.log("Tasks Received");
          console.log(httprequest.response)
          const responseJson = JSON.parse(httprequest.response);
          resolve(responseJson);
        } else {
          console.log(httprequest.response);
          const errorResponse = JSON.parse(httprequest.responseText);
          console.log(httprequest.responseText);
          console.log("Error");
          reject(errorResponse.error);
        }
      }
      httprequest.send();

    });
  }

  getDeliveryById(position: string): DeliveryTaskInfo | undefined{
    console.log("Task delivery Service: "+ this.DeliveryList);
    const task = this.TaskList.find((task) => task.id === position);
    return this.DeliveryList.find((task) => task.id === position);
  }
  getVigilanceById(position: string): VigilanceTaskInfo | undefined{
    console.log("Task vigilance Service: "+ this.VigilanceList);
    const task = this.TaskList.find((task) => task.id === position);
    return this.VigilanceList.find((task) => task.id === position);
  }

}
