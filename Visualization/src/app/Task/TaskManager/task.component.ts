import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-task',
   standalone: true,
    imports: [CommonModule, RouterLink],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/taskManager']">
                          <img class="brand-logo" src="/assets/logoTask.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/actionTask']" data-item='Task Request Actions'>Task Request Actions</a></li>

                      <li><a [routerLink]="['/getAllTask']" data-item='List Task Request'>List Task Request</a></li>
                      <li><a [routerLink]="['/listAllTask']" data-item='List Task'>List Task</a></li>
                      <li><a [routerLink]="['/orderPath']" data-item='Order Path'>Order Path</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Campus</h1>
          <p>With this feature you can: Approve, reject, list tasks and task requests</p>
        </div>
      </section>
  `,
  styleUrls: ["./task.component.css"]

})

export class TaskComponent {

    constructor() {

    }








}
