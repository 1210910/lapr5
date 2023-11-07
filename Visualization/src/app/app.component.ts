import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import {RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent
    ,HomeComponent,
    RouterModule,],
  template: `
    <main>

        <router-outlet>
        </router-outlet>

    </main>
  `,
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'home';
}
