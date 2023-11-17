import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassagewayInfo } from './passagewayinfo';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-passageway-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ol>

      <li style="--accent-color:#6F42C1">
        <div class="icon"><i class="fa-solid fa-bridge"></i></div>
        <div class="title">{{ passagewayInfo.passageCode }}</div>
        <a [routerLink]="['/passagewaydetails', passagewayInfo.passageCode]" ><div class="descr">Learn More</div></a>
      </li>

    </ol>
  `,
  styleUrls: ['./passageway-info.component.css']
})
export class PassagewayInfoComponent {

  @Input() passagewayInfo!: PassagewayInfo;


}
