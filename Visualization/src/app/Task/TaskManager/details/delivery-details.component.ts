import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from "../../../services/task.service";
import { DeliveryTaskInfo } from "../TaskInfo/DeliveryTaskInfo";

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/getAllTask']">
              <img class="brand-logo" src="/assets/logoTask.svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
        <article>

          <section class="listing-description">
            <h2 class="listing-heading">{{deliveryTaskInfo?.userFriendlyId}}</h2>
          </section>
          <section class="listing-features">
            <h2 class="section-heading">About this task request</h2>
            <ul>
            <li> <strong>User : </strong>{{deliveryTaskInfo?.user}}</li>
            <li> <strong>Room origin : </strong>{{deliveryTaskInfo?.roomOrig}}</li>
            <li> <strong>Room destination: </strong>{{deliveryTaskInfo?.roomDest}}</li>
            <li> <strong>State : </strong>{{deliveryTaskInfo?.state}}</li>
            <li> <strong>Type : </strong>{{deliveryTaskInfo?.taskType}}</li>
            <li> <strong>Destination name :</strong> {{deliveryTaskInfo?.destName}}</li>
            <li> <strong>Destination phone number :</strong> {{deliveryTaskInfo?.destPhoneNumber}}</li>
            <li> <strong>Origin name : </strong>{{deliveryTaskInfo?.origName}}</li>
            <li> <strong>Destination name : </strong>{{deliveryTaskInfo?.destName}}</li>
            <li> <strong>Description : </strong>{{deliveryTaskInfo?.description}}</li>
            <li> <strong>Confirmation code : </strong> {{deliveryTaskInfo?.confirmationCode}}</li>

            </ul>
          </section>
        </article>
      </section>
  `,
  styleUrls: ['./details.component.css']
})
export class DeliveryDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);
  deliveryTaskInfo:  DeliveryTaskInfo| undefined;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Task manager") {
      window.location.href = "/";
    }
  }

  constructor() {
    const taskCode = this.route.snapshot.params['id'];
    this.deliveryTaskInfo = this.taskService.getDeliveryById(taskCode);
  }



}