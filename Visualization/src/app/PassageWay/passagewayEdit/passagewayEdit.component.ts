import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../../services/passageway.service";

@Component({
  selector: 'app-passageway-edit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './passagewayEdit.component.html',

  styleUrls: ["../passagewayCreate/passagewayCreate.component.css"]

})

export class PassagewayEditComponent {
  passagewayService: PassagewayService = inject(PassagewayService);

  constructor() {
  }

  async editPassageway() {
    const passageCode = document.getElementsByTagName("input")[0].value;
    const floor1 = document.getElementsByTagName("input")[1].value;
    const floor2 = document.getElementsByTagName("input")[2].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    if ((floor1 == "" && floor2 !== "") || (floor1 !== "" && floor2 == "")) {
      alert("Please fill both floors or leave both empty");
      return;
    }

    this.passagewayService.editPassageway(passageCode, floor1, floor2, description).then(()=>
    {
      alert("Passageway edited successfully");
    }).catch((error) => {
      alert("Passageway not edited: " + error);
    });


  }

}
