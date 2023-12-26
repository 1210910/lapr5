import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LiftService} from "../../services/lift.service";
import {LiftInfo} from "../../Lift/lift-info/liftinfo";

@Component({
    selector: 'app-building',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
    template: `
        <section>
            <header class="brand-name">

                <nav>
                    <ul class="menuItems">
                        <li><a [routerLink]="['/homeUser']">
                            <img class="brand-logo" src="/assets/logoUser.svg" alt="logo" aria-hidden="true">
                        </a></li>
                    </ul>
                </nav>
            </header>

        </section>
        <section>
            <article>
            </article>
        </section>
  `,
    styleUrls: ["./deleteAccount.component.css"]

})

export class DeleteAccountComponent {

    route: ActivatedRoute = inject(ActivatedRoute);

    constructor() {

    }








}
