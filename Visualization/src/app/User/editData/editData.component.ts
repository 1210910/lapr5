import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/signUp/User-info/userinfo';

@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './editData.component.html',
    styleUrls: ["./editData.component.css"]

})

export class EditDataComponent {

    route: ActivatedRoute = inject(ActivatedRoute);
    userService = inject(UserService);
    userInfo: UserInfo | undefined;

    constructor() {
    }


    ngOnInit(): void {
        this.userService.profile().then((user) => {
            console.log(user.phone)
            this.userInfo = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                nif: user.nif,
                password: user.password,
                role: user.role
            };
            console.log(this.userInfo);
            }
        ).catch((error) => {
            alert("Fail Error: " + error);
        });
    }



public async editData(){
    console.log("Info: "+ this.userInfo);

}


}
