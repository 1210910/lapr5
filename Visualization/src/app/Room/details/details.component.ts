import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { RoomService } from '../../services/room.service';
import { RoomInfo } from '../Room-info/roominfo';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

    <header class="brand-name">

      <nav>
        <ul class="menuItems">
          <li><a [routerLink]="['/liftList']">
            <img class="brand-logo" src="/assets/logoRooms.svg" alt="logo" aria-hidden="true">
          </a></li>
        </ul>
      </nav>
    </header>
    <section>
      <article>

        <section class="listing-description">
          <h2 class="listing-heading">{{roomInfo?.roomCode}}</h2>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">About this Room</h2>
          <ul>
            <li>Floor: {{roomInfo?.floor}}</li>
            <li>Description: {{roomInfo?.description}}</li>
            <li>Width: {{roomInfo?.width}}</li>
            <li>Length: {{roomInfo?.length}}</li>
            <li>Room Type: {{roomInfo?.roomType}}</li>
          </ul>
        </section>
      </article>
    </section>
  `,
  styleUrls: ['./details.component.css']
})
export class RoomDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  roomService = inject(RoomService);
  roomInfo: RoomInfo | undefined;


  constructor() {
    const roomCode = this.route.snapshot.params['id'];
    this.roomInfo = this.roomService.getRoomByCode(roomCode);
  }
}
