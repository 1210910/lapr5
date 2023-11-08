import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../Floor/floor-info/floor-info.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";

@Component({
  selector: 'app-aboutus',
   standalone: true,
    imports: [CommonModule, RouterLink],
  template: `
      <section class="body">
          <div class="blog_post">
              <div class="img_pod">
                  <a [routerLink]="['/home']">
                      <img src="/assets/logoAboutUS.svg" alt="logo">
                  </a>
              </div>
              <div class="container_copy">
                  <h1>About Us</h1>
                  <p>We are group of students of LEI, in ISEP. This APP  was developed for the course of Project Laboratory 5,Project RobDroneGO.</p>
                  <h2>Project developed by :</h2>
                  <p>Raul Moreira : 1211094</p>
                  <p>João Almeida : 1211169</p>
                  <p>Diogo Antunes: 1211165</p>
                  <p>Tiago Queirós: 1210910</p>
              </div>

          </div>

      </section>
  `,
  styleUrls: ["./aboutUs.component.css"]

})

export class AboutUsComponent{



}
