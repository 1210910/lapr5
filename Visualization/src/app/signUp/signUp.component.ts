import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {SignUpService} from "../services/signUp.service"


@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './signUp.component.html',
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
        const consent = Boolean(document.getElementById("consent"));


        if (!consent) {
            alert("Please accept the terms and conditions");
        }

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