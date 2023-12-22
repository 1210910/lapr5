import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { VigilanceInfoComponent } from "../TaskInfo/vigilance-info.component";
import { VigilanceTaskInfo } from "../TaskInfo/VigilanceTaskInfo";
import {DeliveryInfoComponent} from "../TaskInfo/delivery-info.component";
import {DeliveryTaskInfo} from "../TaskInfo/DeliveryTaskInfo";


import {TaskService} from "../../../services/task.service";



@Component({
  selector: 'app-taskrequest-list',
  standalone: true,
  imports: [CommonModule, RouterLink, VigilanceInfoComponent, DeliveryInfoComponent],
  templateUrl: './taskRequestList.component.html',
  styleUrls: ["../listTasks.component.css"]

})

export class ListAllTaskRequestComponent {
  vigilanceList: VigilanceTaskInfo[] = [];
  deliveryList: DeliveryTaskInfo[] = [];
  taskService: TaskService = inject(TaskService);

  constructor() {
  }

  ngOnInit() {
    this.taskService.getVigilanceTaskRequests().then((result:any) => {
      const responseJson = JSON.parse(result);
      const vigilanceTaskList : VigilanceTaskInfo[] = responseJson.map((vigilanceTask: any) => {
        return {
          id: vigilanceTask.id,
          description: vigilanceTask.description,
          user: vigilanceTask.user,
          roomDest: vigilanceTask.roomDest,
          roomOrig: vigilanceTask.roomOrig,
          requestName : vigilanceTask.requestName,
          requestNumber : vigilanceTask.requestNumber,
          state : vigilanceTask.state

        }
      });
      this.vigilanceList = vigilanceTaskList;

    });
    this.taskService.getDeliveryTaskRequests().then((result:any) => {
      const responseJson = JSON.parse(result);
      const deliveryTaskList : DeliveryTaskInfo[] = responseJson.map((deliveryTask: any) => {
        return {
          id: deliveryTask.id,
          description: deliveryTask.description,
          user: deliveryTask.user,
          roomDest: deliveryTask.roomDest,
          roomOrig: deliveryTask.roomOrig,
          destName : deliveryTask.destName,
          origName : deliveryTask.origName,
          destPhoneNumber : deliveryTask.destPhoneNumber,
          origPhoneNumber : deliveryTask.origPhoneNumber,
          code : deliveryTask.code,
          state : deliveryTask.state

        }
      });
      this.deliveryList = deliveryTaskList;
    });
  }


}
