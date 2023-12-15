import {Component, EventEmitter, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './privacyPolicy.html',
    styleUrls: ["./termsAndConditions.css"]
})

export class PrivacyPolicyComponent {

    @Output() consentAccepted= new EventEmitter<boolean>();

    constructor() {

    }
}