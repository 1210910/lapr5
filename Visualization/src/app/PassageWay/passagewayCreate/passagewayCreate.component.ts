import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../../services/passageway.service";

@Component({
  selector: "app-passageway-create",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './passagewayCreate.component.html',
  styleUrls: ["./passagewayCreate.component.css"]

})

export class PassagewayCreateComponent {
  passagewayService: PassagewayService = inject(PassagewayService);

  constructor() {
  }

  createPassageway() {
    const floor1 = document.getElementsByTagName("input")[0].value;
    const floor2 = document.getElementsByTagName("input")[1].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    if (floor1 == "" || floor2 == "") {
      alert("Please fill in all fields");
      return;

    }
    this.passagewayService.createPassageway(floor1, floor2, description).then(() => {

      alert("Passageway created");

    }).catch((error) => {
      alert("Passageway not created: " + error);
    });

  }

}
