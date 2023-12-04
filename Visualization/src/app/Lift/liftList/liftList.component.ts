import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftInfoComponent} from "../lift-info/lift-info.component";
import {LiftInfo} from "../lift-info/liftinfo";
import {LiftService} from "../../services/lift.service";

@Component({
  selector: 'app-floor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LiftInfoComponent],
  templateUrl: './liftList.component.html',
  styleUrls: ["../liftCreate/liftCreate.component.css"]

})

export class LiftListComponent {
  liftList: LiftInfo[] = [];
  liftService: LiftService = inject(LiftService);

  ngOnInit() {
    this.liftService.listLifts().then((result) => {
      this.liftService.liftList(result)
      this.liftList = this.liftService.LiftList;
    });
  }

  constructor() {
  }

  CallMethod(building: string) {
    this.liftService.listLifts().then((result) => {
      this.liftService.liftListFromABuilding(result, building);
      this.liftList = this.liftService.LiftList;
    });
  }


}
