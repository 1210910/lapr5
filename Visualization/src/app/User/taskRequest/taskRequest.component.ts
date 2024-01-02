import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-request',
    standalone: true,
    imports: [CommonModule, RouterLink,FormsModule],
    templateUrl: './taskRequest.component.html',
    styleUrls: ["./taskRequest.component.css"]

})

export class TaskRequestComponent {
    selectedTaskType: string = 'Delivery';
    taskService: TaskService = inject(TaskService);
    route: ActivatedRoute = inject(ActivatedRoute);
    constructor() {

    }

    public async createTaskRequest(): Promise<void> {

        
    }


    public async onTaskTypeChange(): Promise<void> {
    }
    public async createVigilanceRequest(): Promise<void> {
      
        const origRoom = document.getElementsByTagName("input")[0].value;
        const destRoom = document.getElementsByTagName("input")[1].value;
        const requestName = document.getElementsByTagName("input")[2].value;
        const requestNumber = document.getElementsByTagName("input")[3].value;
        const description = document.getElementsByTagName("textarea")[0].value;

        if (origRoom == "" || destRoom== "" || description == "" || requestName == "" || requestNumber == "" ) {
            alert("Please fill in all fields");
            return;
        }
        console.log("type: " + this.selectedTaskType)
        this.taskService.createVigilanceTask(origRoom, destRoom, requestName, requestNumber, description).then((result) => {
            alert("Task request created successfully");

        }).catch((error) => {
            alert("Error: " + error);
       });
    }
    
    public async createDeliveryRequest(): Promise<void> {
        const origName = document.getElementsByTagName("input")[0].value;
        const destName = document.getElementsByTagName("input")[1].value;
        const origPhoneNumber = document.getElementsByTagName("input")[2].value;
        const destPhoneNumber = document.getElementsByTagName("input")[3].value;
        const origRoom = document.getElementsByTagName("input")[4].value;
        const destRoom = document.getElementsByTagName("input")[5].value;
        const confirmationCode = document.getElementsByTagName("input")[6].value;
        const description = document.getElementsByTagName("textarea")[0].value;

        if (origName == "" || destName == "" || origPhoneNumber == "" || destPhoneNumber == "" || origRoom == "" || destRoom == "" || description == "") {
            alert("Please fill in all fields");
            return;
        }
        this.taskService.createDeliveryTask(origName, destName, origPhoneNumber, destPhoneNumber, origRoom, destRoom ,description, confirmationCode).then((result) => {
            alert("Task request created successfully");

        }).catch((error) => {
            alert("Error: " + error);
        });
    }

}
