import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { UserInfo } from "src/app/signUp/User-info/userinfo";

@Component({
  selector: "app-building",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: "./editData.component.html",
  styleUrls: ["./editData.component.css"]

})

export class EditDataComponent {

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
          console.log(user.phone);
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
        alert("Fail Error: " + error.message);
      });
    }
  }


  public async editData() {
    const email = this.userInfo?.email as string;
    const firstName = document.getElementsByTagName("input")[0].value;
    const lastName = document.getElementsByTagName("input")[1].value;
    const phone = Number(document.getElementsByTagName("input")[2].value);
    const nif = Number(document.getElementsByTagName("input")[3].value);

    if (firstName == "" || lastName == "" || phone == 0) {
      alert("There can be no empty spaces");
      return;
    }
    this.userService.editData(email, firstName, lastName, phone, nif).then((result) => {
      alert("User data edited successfully");

    }).catch((error) => {
      alert("Fail: " + error);
    });


  }


}
