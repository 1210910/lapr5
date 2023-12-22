import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";


import {result} from "lodash";
import {FormsModule} from "@angular/forms";

import {TaskInfo} from "../TaskInfo/TaskInfo";
import {TaskService} from "../../../services/task.service";

@Component({
    selector: 'app-task-action',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/taskManagement']">
                          <img class="brand-logo" src="/assets/logoRooms.svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="container-body">
          <div class="container">
              <div class="text">
                  Insert Data
              </div>
              <form action="#">
                  <div class="form-row">
                      <div class="input-data select-container">
                          <label for="selectedFloor">Select a task</label>
                          <select [(ngModel)]="selectedTask" name="selectedTask" id="selectedTask">
                              <option value="" disabled>Select a passageway</option>
                              <option *ngFor="let task of this.tasks" [ngValue]="task">{{ task.id }}</option>
                          </select>
                      </div>
                  </div>
                      <div class="form-row">
                      <label for="action">Select action:</label>
                          <select id="actiontype">
                              <option value= "reject">Reject</option>
                              <option value="approve">Approve</option>

                          </select>
                      </div>
                <div class="form-row submit-btn">
                  <div class="input-data">
                    <div class="inner"></div>
                    <a [routerLink]="['/task']"><input type="submit" value="submit" (click)="action()" data-cy="roomCreateButton" > </a>
                  </div>
                </div>
              </form>
          </div>
          </section>
  `,
    styleUrls: ["./taskApproveReject.component.css"]

})

export class TaskApproveRejectComponent {
    taskService: TaskService = inject(TaskService);
    selectedTask: any;
    tasks: TaskInfo[];

    constructor() {
        this.tasks = [];
    }
    ngOnInit() {
        this.listTasks();
    }

    action(){

        const task = this.selectedTask.id;
        const actionType = document.getElementsByTagName("select")[1].value;


        if (task == null || actionType == null) {
            alert("Please fill in all fields");
            return;
        }


        const taskType = this.taskService.taskType(task);

        if (taskType == "VIGILANCE") {
            if (actionType == "reject") {
                this.taskService.rejectVigilanceTask(task).then(result => {
                    alert("Task rejected");
                }).catch(error => {
                    alert("Task not rejected: " + error);
                });
            }else if (actionType == "approve") {
                this.taskService.approveVigilanceTask(task).then(result => {
                    alert("Task approved");
                }).catch(error => {
                    alert("Task not approved: " + error);
                });
            }
        }else if (taskType == "DELIVERY") {
            if (actionType == "reject") {
                this.taskService.rejectDeliveryTask(task).then(result => {
                    alert("Task rejected");
                }).catch(error => {
                    alert("Task not rejected: " + error);
                });
            }else if (actionType == "approve") {
                this.taskService.approveDeliveryTask(task).then(result => {
                    alert("Task approved");
                }).catch(error => {
                    alert("Task not approved: " + error);
                });
            }

        }


   }

    public listTasks() {
        this.taskService.allPendingTaskRequests();
        this.tasks = this.taskService.TaskList;
    };

}
