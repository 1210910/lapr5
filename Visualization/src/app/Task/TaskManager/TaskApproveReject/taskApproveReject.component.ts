import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

import { result } from "lodash";
import { FormsModule } from "@angular/forms";
import { TaskInfoTotal } from "../details/TaskInfoTotal";
import { TaskService } from "../../../services/task.service";

@Component({
  selector: "app-task-action",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./taskApproveReject.component.html",
  styleUrls: ["./taskApproveReject.component.css"]

})

export class TaskApproveRejectComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  tasks: TaskInfoTotal[];

  constructor() {
    this.tasks = [];
  }

  ngOnInit() {

    if (localStorage.getItem("role") !== "Task manager") {
      window.location.href = "/";
    } else
      this.listTasks();
  }

  public async accept(task: TaskInfoTotal) {
    if (task.taskType === "Delivery") {
      this.taskService
        .approveDeliveryTask(task.id)
        .then(() => {
          // Update list
          location.reload();
          alert("Delivery Task Request Accepted Successfully");
        })
        .catch(() => {
          console.error("Failed to Accept Delivery Task Request");
        });
    } else {
      this.taskService
        .approveVigilanceTask(task.id)
        .then(() => {
          // Update list
          location.reload();
          alert("Vigilance Task Request Accepted Successfully");
        })
        .catch(() => {
          console.error("Failed to Accept Vigilance Task Request");
        });
    }
  }

  public async deny(task: TaskInfoTotal) {
    if (task.taskType === "Delivery") {
      this.taskService
        .rejectDeliveryTask(task.id)
        .then(() => {
          location.reload();
          alert("Delivery Task Request Rejected Successfully");
        })
        .catch(() => {
          console.error("Failed to Reject Delivery Task Request");
        });
    } else {
      this.taskService
        .rejectVigilanceTask(task.id)
        .then(() => {
          location.reload();
          alert("Vigilance Task Request Reject Successfully");
        })
        .catch(() => {
          console.error("Failed to Reject Vigilance Task Request");
        });
    }
  }

  public async listTasks() {
    try {
      console.log("olaa");
      this.tasks = (await this.taskService.allPendingTaskRequests()) as TaskInfoTotal[];
      console.log("Tasks length:", this.tasks.length); // Log the length of the tasks array
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
}