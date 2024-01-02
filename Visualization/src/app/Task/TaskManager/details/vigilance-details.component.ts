import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from "../../../services/task.service";
import { DeliveryTaskInfo } from "../TaskInfo/DeliveryTaskInfo";
import { VigilanceTaskInfo } from '../TaskInfo/VigilanceTaskInfo';

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
            <h2 class="listing-heading">{{VigilanceTaskInfo?.userFriendlyId}}</h2>
          </section>
          <section class="listing-features">
            <h2 class="section-heading">About this task request</h2>
            <ul>
            <li> <strong>User : </strong>{{VigilanceTaskInfo?.user}}</li>
            <li> <strong>Room origin : </strong>{{VigilanceTaskInfo?.roomOrig}}</li>
            <li> <strong>Room destination: </strong>{{VigilanceTaskInfo?.roomDest}}</li>
            <li> <strong>State : </strong>{{VigilanceTaskInfo?.state}}</li>
            <li> <strong>Type : </strong>{{VigilanceTaskInfo?.taskType}}</li>
            <li> <strong>Request name :</strong> {{VigilanceTaskInfo?.requestName}}</li>
            <li> <strong>Request phone number :</strong> {{VigilanceTaskInfo?.requestNumber}}</li>
            <li> <strong>Description : </strong>{{VigilanceTaskInfo?.description}}</li>
            </ul>
          </section>
        </article>
      </section>
  `,
  styleUrls: ['./details.component.css']
})
export class VigilanceDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);
  VigilanceTaskInfo:  VigilanceTaskInfo| undefined;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Task manager") {
      window.location.href = "/";
    }
  }

  constructor() {
    const taskCode = this.route.snapshot.params['id'];
    this.VigilanceTaskInfo = this.taskService.getVigilanceById(taskCode);
  }



}