import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LiftService} from "../../services/lift.service";
import {LiftInfo} from "../../Lift/lift-info/liftinfo";
import { UserService } from "../../services/user.service";

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

        <section class="confirmation-section">
    <div class="title">Are you sure you want to delete your account?</div>
    <div class="form-row">
        <div class="submit-btn">
            <div class="input-data">
                <div class="inner"></div>
                <a [routerLink]="['']"><input type="Delete Account" value="Delete Account" (click)="deleteAccount()" > </a>
            </div>
        </div>
    </div>
</section>
  `,
    styleUrls: ["./deleteAccount.component.css"]

})

export class DeleteAccountComponent {

    userService: UserService = inject(UserService);
    route: ActivatedRoute = inject(ActivatedRoute);

    constructor() {

    }

  
  public async deleteAccount(): Promise<void> {
    this.userService.deleteAccount().then((result)=>{
      alert ("User account deleted");
    }).catch((error) => {
      alert("Fail Error: " + error);
    });
  }
}
