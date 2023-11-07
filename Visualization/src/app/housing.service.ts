import { Injectable } from '@angular/core';
import {HousingLocation} from "./houselocation";
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [
    {
      id: "A",
      name: 'Edificio A',
      maxLength: 100,
      maxWidth: 100,
      description: 'Edificio A do campus ISEP'

    },
    {
      id: "B",
      name: 'Edificio B',
      maxLength: 100,
      maxWidth: 100,
      description: 'Edificio B do campus ISEP'
    },
  ];

  constructor() { }

  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }
  getHousingLocationById(id: string): HousingLocation | undefined{
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
  createBuilding(code: string, name: string, length: string, width: string, description: string):boolean {
    console.log(`Building created`);
    return true;
  }
}
