import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { VigilanceInfoComponent } from "../TaskInfo/vigilance-info.component";
import { VigilanceTaskInfo } from "../TaskInfo/VigilanceTaskInfo";
import { DeliveryInfoComponent } from "../TaskInfo/delivery-info.component";
import { DeliveryTaskInfo } from "../TaskInfo/DeliveryTaskInfo";
import { FilterInfo } from "../TaskInfo/FilterInfo";

import { TaskService } from "../../../services/task.service";
import { FormsModule } from "@angular/forms";


@Component({
  selector: "app-taskrequest-list",
  standalone: true,
  imports: [CommonModule, RouterLink, VigilanceInfoComponent, DeliveryInfoComponent, FormsModule],
  templateUrl: "./taskRequestList.component.html",
  styleUrls: ["../listTasks.component.css"]

})

export class ListAllTaskRequestComponent {
  vigilanceList: VigilanceTaskInfo[] = [];
  deliveryList: DeliveryTaskInfo[] = [];
  taskService: TaskService = inject(TaskService);
  filter: FilterInfo = { state: "", deviceType: "", user: "" };

  constructor() {
  }

  async ngOnInit() {
    if (localStorage.getItem("role") !== "Task manager") {
      window.location.href = "/";
    } else {
      this.vigilanceList = await this.taskService.getVigilanceTaskRequests() as VigilanceTaskInfo[];
      this.deliveryList = await this.taskService.getDeliveryTaskRequests() as DeliveryTaskInfo[];
      this.taskService.DeliveryList = this.deliveryList;
      this.taskService.VigilanceList = this.vigilanceList;
    }
  }


  public async applyFilters() {
    const { state, deviceType, user } = this.filter;
    console.log(this.filter);
    try {
      if (deviceType === "Vigilance") {

        this.vigilanceList = await this.taskService.getVigilanceFilteredTasks(state, user) as VigilanceTaskInfo[];
        this.deliveryList = [];

      } else if (deviceType === "Delivery") {

        this.deliveryList = await this.taskService.getDeliveryFilteredTasks(state, user) as DeliveryTaskInfo[];
        this.vigilanceList = [];
      } else {

        [this.vigilanceList, this.deliveryList] = await Promise.all([
          this.taskService.getVigilanceFilteredTasks(state, user) as Promise<VigilanceTaskInfo[]>,
          this.taskService.getDeliveryFilteredTasks(state, user) as Promise<DeliveryTaskInfo[]>
        ]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }


}
