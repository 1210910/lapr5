import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { User } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/signUp/User-info/userinfo';


@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
    template: `
        <section>
            <header class="brand-name">

                <nav>
                    <ul class="menuItems">
                        <li><a [routerLink]="['/userData']">
                            <img class="brand-logo" src="/assets/logoUser.svg" alt="logo" aria-hidden="true">
                        </a></li>
                    </ul>
                </nav>
            </header>

        </section>
        <section>
            <article>
                <section class="listing-description">
                    <h2 class="listing-heading">{{userInfo?.firstName +  " " +  userInfo?.lastName}}</h2>
                </section>
                <section class="listing-features">
            <h2 class="section-heading">About this User</h2>
            <ul>
            <li *ngIf="userInfo?.email">Email: {{ userInfo?.email }}</li>
            <li *ngIf="userInfo?.phone">Phone Number: {{ userInfo?.phone }}</li>
            <li *ngIf="userInfo?.nif">NIF: {{ userInfo?.nif }}</li>
            <li *ngIf="userInfo?.role">Role: {{ userInfo?.role }}</li>
            </ul>
        </section>
        <div class="form-row">
            <div class="submit-btn">
                <div class="input-data">
                    <div class="inner"></div>
                    <a [routerLink]="['/userData']">
                        <input type="button" value="Download my Data" (click)="downloadData()">
                    </a>
                </div>
            </div>
        </div>
    </article>
</section>
  `,
    styleUrls: ["./dataCopy.component.css"]

})

export class DataCopyComponent {

    route: ActivatedRoute = inject(ActivatedRoute);
    userService = inject(UserService);
    userInfo: UserInfo | undefined;

    constructor() {
    }

    ngOnInit(): void {
      if (localStorage.getItem("role") !== "User") {
        window.location.href = "/";
      } else {
        this.userService.profile().then((user) => {
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
    }

    downloadData(){
        this.userService.downloadData();
    }

}
