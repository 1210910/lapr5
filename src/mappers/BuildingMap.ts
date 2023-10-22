import { Mapper } from "../core/infra/Mapper";

import {IBuildingDTO} from "../dto/IBuildingDTO";

import { Building } from "../domain/Building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class BuildingMap extends Mapper<Building> {

  public static toDTO( building: Building): IBuildingDTO {
    return {
      name: building.name,
      description: building.description
    } as IBuildingDTO;
  }

  public static async toDomain (raw: any): Promise<Building> {
    

    const buildingOrError = Building.create({
      name: raw.name,
      description: raw.description
    }, new UniqueEntityID(raw.domainId))

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null ;
  }

  public static toPersistence (building: Building): any {
    const e = {
      domainId: building.id.toString(),
      name: building.name,
      description: building.description
    }
    return e;
  }
}