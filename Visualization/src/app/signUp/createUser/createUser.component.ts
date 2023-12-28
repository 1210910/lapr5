import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service"
import { FormsModule } from "@angular/forms";
import { BuildingInfo } from "../../Building/building-info/buildingInfo";


@Component({
    selector: 'app-createuser',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './createUser.component.html',
    styleUrls: ["./createUser.component.css"]
})

export class CreateUserComponent {

    userService: UserService = inject(UserService);

    constructor() {

    }

    public async signUp(): Promise<void> {
        const firstName = document.getElementsByTagName("input")[0].value;
        const lastName = document.getElementsByTagName("input")[1].value;
        const email = document.getElementsByTagName("input")[2].value;
        const phoneNumber = Number(document.getElementsByTagName("input")[3].value);
        const NIF = Number(document.getElementsByTagName("input")[4].value);
        const password = document.getElementsByTagName("input")[5].value;
        const role = document.getElementsByTagName("select")[0].value;

        if (firstName == "" || lastName == "" || email == "" || phoneNumber == null || NIF == null || password == "" || role == "") {
            alert("Please fill in all fields");
            return;
        }

        this.userService.createUser(firstName, lastName, email, phoneNumber, NIF, password, role).then((result)=>{
            alert ("User account created");
        }).catch((error) => {
            alert("Fail Error: " + error);
        });
    }

}