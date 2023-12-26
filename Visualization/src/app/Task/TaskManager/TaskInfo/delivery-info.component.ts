import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryTaskInfo } from './DeliveryTaskInfo';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-delivery-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <li style="--accent-color:#6F42C1">
          <div class="icon"><i class="fa fa-robot"></i></div>
          <div class="title">{{ deliveryTask.description }}</div>
          <a [routerLink]="['/deliverydetails', {'code': deliveryTask.id}]">
              <div class="descr">Learn More</div>
          </a>
      </li>
  `,
  styleUrls: ['./info.component.css']
})
export class DeliveryInfoComponent {

  @Input() deliveryTask!: DeliveryTaskInfo;


}
