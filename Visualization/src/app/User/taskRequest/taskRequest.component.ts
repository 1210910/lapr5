import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { VigilanceTaskInfo } from 'src/app/Task/TaskManager/TaskInfo/VigilanceTaskInfo';
import { DeliveryTaskInfo } from 'src/app/Task/TaskManager/TaskInfo/DeliveryTaskInfo';

@Component({
    selector: 'app-task-request',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './taskRequest.component.html',
    styleUrls: ["./taskRequest.component.css"]

})

export class TaskRequestComponent {
    selectedTaskType: string = 'Delivery';
    taskService: TaskService = inject(TaskService);
    route: ActivatedRoute = inject(ActivatedRoute);
    constructor() {

    }

    ngOnInit() {
        if (localStorage.getItem("role") !== "User") {
            window.location.href = "/";
        }
    }
    public async createTaskRequest(): Promise<void> {


    }


    public async onTaskTypeChange(): Promise<void> {
    }
    public async createVigilanceRequest(): Promise<void> {

        const origRoom = document.getElementsByTagName("input")[0].value;
        const destRoom = document.getElementsByTagName("input")[1].value;
        const description = document.getElementsByTagName("textarea")[0].value;

        if (origRoom == "" || destRoom == "" || description == "") {
            alert("Please fill in all fields");
            return;
        }
        try {
            const result = await this.taskService.createVigilanceTask(origRoom, destRoom, description) as VigilanceTaskInfo;
            console.log("Result:", result);
            if (result) {
                alert("Task request created successfully with id: " + result.userFriendlyId);
            }

        } catch (error) {
            alert("Error: " + error);
        }
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
        try {
            const result = await this.taskService.createDeliveryTask(origName, destName, origPhoneNumber, destPhoneNumber, origRoom, destRoom, description, confirmationCode) as DeliveryTaskInfo;
            if (result) {
                alert("Task request created successfully with id: " + result.userFriendlyId);
            }

        }catch (error) {
            alert("Error: " + error);
        }
    }
}
