import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/']">
                          <img class="brand-logo" src="/assets/logoTask.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/taskManagement']" data-item='Tasks'>Tasks</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
          <div class="cd-intro-content bouncy">
              <h1>Task Manager App</h1>
              <p>Manage tasks with ease</p>
              <div class="action-wrapper">
                  <a [routerLink]="['/aboutUs']" class="cd-btn main-action">About Us</a>
                  <a href="https://moodle.isep.ipp.pt/pluginfile.php/325421/mod_resource/content/1/LAPR5-regras-gerais-funcionamento.v2.pdf" target="_blank" class="cd-btn">Learn More</a>
              </div>
          </div>
      </section>
  `,
  styleUrls: ["./home.component.css"]

})

export class TaskManagerComponent {

  ngOnInit() {
    if (localStorage.getItem("role") !== "Task manager") {
      window.location.href = "/";
    }
  }

  constructor() {
  }

}
