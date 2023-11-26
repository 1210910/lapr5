import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import routes from "../../routes";
import {RoomService} from "../../services/room.service";
import {result} from "lodash";

@Component({
    selector: 'app-floor-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/room']">
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
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Room Code</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Floor</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Length</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Width</label>
                      </div>
                    </div>
                      <div class="form-row">
                      <label for="roomtype">Choose a room type:</label>
                          <select id="roomtype">
                              <option value= "office">Office</option>
                              <option value="amphitheater">Amphitheater</option>
                              <option value="laboratory">Laboratory</option>
                              <option value="classroom">Classroom</option>
                              <option value="other">Other</option>
                          </select>
                      </div>
                  <div class="form-row">
                      <div class="input-data textarea">
                          <textarea rows="8" cols="80" required></textarea>
                          <br />
                          <div class="underline"></div>
                          <label for="">Description</label>
                          <br />
                          <div class="form-row submit-btn">
                              <div class="input-data">
                                  <div class="inner"></div>
                                  <a [routerLink]="['/room']"><input type="submit" value="submit" (click)="createRoom()" data-cy="roomCreateButton" > </a>
                              </div>
                          </div>
                        </div>
                    </div>
              </form>
          </div>
          </section>
  `,
    styleUrls: ["./roomCreate.component.css"]

})

export class RoomCreateComponent {
    roomService: RoomService = inject(RoomService);

    constructor() {
    }

   createRoom(){

        const roomCode = document.getElementsByTagName("input")[0].value;
        const floor = document.getElementsByTagName("input")[1].value;
        const description = document.getElementsByTagName("textarea")[0].value;
        const width = Number(document.getElementsByTagName("input")[2].value);
        const length = Number(document.getElementsByTagName("input")[3].value);
        const roomType = document.getElementsByTagName("select")[0].value;


        if (roomCode == "" || floor == "" || length == null || width == null || description == "" || roomType == ""){
            alert("Please fill in all fields");
            return;
        }

       this.roomService.createRoom(roomCode , floor , description , width , length, roomType).then(result =>{

              alert("Room Created");

       }).catch(error => {
              alert("Room not created: " + error);
         });
   }

}
