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
              <li><a [routerLink]="['/taskManagement']">
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
              <div class="input-data select-container">
                <label for="selectedFloor">Algorithm to be used</label>
                <select [(ngModel)]="selectedAlgorithm" name="selectedAlgorithm" id="selectedAlgorithm">
                  <option value="" disabled>Select a Algorithm</option>
                  <option *ngFor="let floor of this.algorithmList" [ngValue]="floor">{{ floor }}</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="input-data textarea">
                <textarea rows="10" cols="80" ></textarea>
                <br />
                <div class="underline"></div>
                <label for=""></label>
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
    selectedAlgorithm: any;
    algorithmList=["Genetic","Normal"]
    tasks: TaskInfo[];
    isLoading = false;


    constructor() {
        this.tasks = [];
    }


  async load(){


    this.isLoading = true;
    try {
       const type = this.selectedAlgorithm ;


       // @ts-ignore
      const tasks : any = await this.taskService.getAcceptedTasks();

      const tasksArray = JSON.parse(tasks);

      let tasksid = [];

     for (const task of tasksArray) {
         console.log(task);
         console.log(task.id);
        tasksid.push(task.id.replace(/"/g, "'"));
      }

      console.log(tasksid);
      let result;
      if (type == "Normal") {
        result =await this.taskService.getPath(tasksid.toString());
      }else if (type == "Genetic") {
        result = await this.taskService.getPathGenetic(tasksid.toString());
      }


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


        let stringSemColchetes = JSON.stringify(path).replace(/\[|\]/g, '');
        let arrayDeCodigos = stringSemColchetes.split(',');

        console.log(arrayDeCodigos);

        const tasksToCheck = await this.taskService.getAllTasks();

        console.log(tasksToCheck)

        let response:any[] = [];
        for (const code of arrayDeCodigos) {
          for (const task of tasksToCheck) {

                if (task.id == code.replace(/"/g, "")) {
                  console.log(task.id);
                    if (task.robotId != null) {
                      // @ts-ignore
                        if (response.hasOwnProperty(task.robotId)) {
                            // Se o robotId já existe no response, adiciona task.id ao array existente
                            // @ts-ignore
                            response[task.robotId].push(task.description);
                        } else {
                            // Se não existe, cria um novo array com task.id associado a esse robotId
                            // @ts-ignore
                            response[task.robotId] = [task.description];
                        }
                    }
                }
            }
        }

        console.log(response);
        let finalString = '';

          for (const robotId in response) {
              if (response.hasOwnProperty(robotId)) {
                  finalString += `${robotId}: [${response[robotId].join(', ')}]\n`;
              }
          }
          let i = 0;
          for (const robotId in response) {
              for (const code of response[robotId]) {
                  for (const task of tasksToCheck) {

                      if (task.description == code) {
                          console.log(task.id);
                          if (i == 0) {
                              await this.taskService.startVigilanceTask(task.id);
                          }else if (i == 1){
                              await this.taskService.startDeliveryTask(task.id);
                          }
                      }

                  }
              }
            i++;
          }



        document.getElementsByTagName("textarea")[0].value = finalString;


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
