import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
    selector: 'app-task-request',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './taskRequest.component.html',
    styleUrls: ["./taskRequest.component.css"]

})

export class TaskRequestComponent {

    taskService: TaskService = inject(TaskService);
    route: ActivatedRoute = inject(ActivatedRoute);
    constructor() {

    }

    public async createTaskRequest(): Promise<void> {

        const code = document.getElementsByTagName("input")[0].value;
        const name = document.getElementsByTagName("input")[1].value;
        const description = document.getElementsByTagName("textarea")[0].value;
        const length = Number(document.getElementsByTagName("input")[2].value);
        const width = Number(document.getElementsByTagName("input")[3].value);

        if (code == "" || name == "" || length == null || width == null) {
            alert("Please fill in all fields");
            return;
        }

        this.taskService.createTask(code,name,name,length,length,name).then((result) => {
            alert("Requested Task Created");

        }).catch((error) => {
            alert("Fail Error ");
        });
    }
}
