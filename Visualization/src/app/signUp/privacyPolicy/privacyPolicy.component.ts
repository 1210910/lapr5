import {Component, EventEmitter, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './privacyPolicy.html',
    styleUrls: ["../termsAndConditions/termsAndConditions.css"]
})

export class PrivacyPolicyComponent {

}