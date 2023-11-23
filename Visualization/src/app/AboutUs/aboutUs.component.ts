import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
    selector: 'app-aboutus',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './aboutUs.component.html',
    styleUrls: ["./aboutUs.component.css"]

})

export class AboutUsComponent {



}
