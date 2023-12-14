import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {SignUpService} from "../services/signUp.service"


@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container" onclick="onclick">
            <div class="top"></div>
            <div class="bottom"></div>
            <div class="center">
                <img class="brand-logo" src="/assets/login.svg" alt="logo" aria-hidden="true">
                <input type="firstName" placeholder="First Name"/>
                <input type="lastName" placeholder="Last Name"/>
                <input type="email" placeholder="Email"/>
                <input type="phoneNumber" placeholder="Phone Number"/>
                <input type="NIF" placeholder="NIF"/>
                <input type="password" placeholder="Password"/>
                <!--<div>
                <input type="checkbox" id="consent" (change)="onConsentChange($event)"/>
                    <label for="consent">I agree to the <a href="./TermsandConditions.html">Terms and Conditions</a></label>
            </div>-->
                <a [routerLink]="['']">
                    <button type="submit" value="submit" (click)="signUp()" data-cy="signUpButton" >
                        Sign Up
                    </button>
                </a>
                <a [routerLink]="['']">
                    <button type="reset" value="cancel" data-cy="cancelButton">
                        Cancel
                    </button>
                </a>
            </div>
        </div>
  `,
    styleUrls: ["./signUp.component.css"]

})

export class SignUpComponent {

    @Output() consentAccepted= new EventEmitter<boolean>();

    signUpService: SignUpService = inject(SignUpService);

    constructor() {

    }

    public async signUp(): Promise<void> {
        const firstName = document.getElementsByTagName("input")[0].value;
        const lastName = document.getElementsByTagName("input")[1].value;
        const email = document.getElementsByTagName("input")[2].value;
        const phoneNumber = Number(document.getElementsByTagName("input")[3].value);
        const NIF = Number(document.getElementsByTagName("input")[4].value);
        const password = document.getElementsByTagName("input")[5].value;
        /*let consent: boolean;
        consent = Boolean(document.getElementById("consent"));


        if (consent == false) {
            alert("Please accept the terms and conditions");
        }*/

        if (firstName == "" || lastName == "" || email == "" || phoneNumber == null || NIF == null || password == "" ) {
            alert("Please fill in all fields");
            return;
        }

        this.signUpService.createUser(firstName, lastName, email, phoneNumber, NIF, password, "Utente").then((result)=>{
            alert ("User account created");
        }).catch((error) => {
            alert("Fail Error");
        });
    }

    public onConsentChange(event: any) {
        this.consentAccepted.emit(event.target.checked);
        }

    protected readonly event = event;
}