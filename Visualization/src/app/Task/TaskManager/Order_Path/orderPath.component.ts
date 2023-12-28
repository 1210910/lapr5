import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";


import {result} from "lodash";
import {FormsModule} from "@angular/forms";

import {TaskInfo} from "../TaskInfo/TaskInfo";
import {TaskService} from "../../../services/task.service";

@Component({
    selector: 'app-task-action',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
      <section>
        <header class="brand-name">

          <nav>
            <ul class="menuItems">
              <li><a [routerLink]="['/TaskManagement']">
                <img class="brand-logo" src="/assets/logoCampus.svg" alt="logo" aria-hidden="true">
              </a></li>
            </ul>
          </nav>
        </header>

      </section>
      <section class="body">
        <div class="container">
          <div class="text">
            Order Path
          </div>
          <form action="#">

            <div class="form-row">
              <div class="input-data textarea">
                <textarea rows="10" cols="80" ></textarea>
                <br />
                <div class="underline"></div>
                <label for="">Path</label>
                <br />
                <div class="form-row submit-btn">
                  <div class="input-data">
                    <div class="inner"></div>
                    <input type="button" value="submit" (click)="load()" >
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
  `,
    styleUrls: ["./orderPath.component.css"]

})

export class OrderPathComponent {
    taskService: TaskService = inject(TaskService);
    selectedTask: any;
    tasks: TaskInfo[];
    isLoading = false;


    constructor() {
        this.tasks = [];
    }


  async load(){


    this.isLoading = true;
    try {
      // @ts-ignore
      const tasks = 'Task1,Task2,Task3,Task4,Task5';
      const result = await this.taskService.getPath(tasks);

      if (result != "") {
        alert(JSON.stringify(result));

        // tirar as duas primeiras linhas do result antes de fazer o parse  (result = result.substring(2);)

        // @ts-ignore
        const resultString:string = result;
        const index = resultString.indexOf('{');
        resultString.substring(index);

        console.log (index);
        console.log (resultString.substring(index));

        // @ts-ignore
        const obj = JSON.parse(resultString.substring(index));



        const path = obj.path;

        document.getElementsByTagName("textarea")[0].value = JSON.stringify(path);
      } else {
        alert(result);
      }
    }catch (e) {
      alert(e);
    } finally {
      this.isLoading = false;
    }




  }




    public listTasks() {
        this.taskService.allPendingTaskRequests();
        this.tasks = this.taskService.TaskList;
    };

}
