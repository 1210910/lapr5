import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigilanceTaskInfo } from './VigilanceTaskInfo';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-vigilance-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <li style="--accent-color:#6F42C1">
          <div class="icon"><i class="fa fa-robot"></i></div>
          <div class="title">{{ vigilanceTask.userFriendlyId }}</div>
          <a [routerLink]="['/vigilancedetails', vigilanceTask.id]">
              <div class="descr">Learn More</div>
          </a>
      </li>
  `,
  styleUrls: ['./info.component.css']
})
export class VigilanceInfoComponent {

  @Input() vigilanceTask!: VigilanceTaskInfo;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Task manager") {
      window.location.href = "/";
    }
  }


}
