import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


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
                            <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
                        </a></li>
                    </ul>
                </nav>
            </header>
        </section>
  `,
    styleUrls: ["./editData.component.css"]

})

export class EditDataComponent {

    route: ActivatedRoute = inject(ActivatedRoute);


    constructor() {
    }








}
