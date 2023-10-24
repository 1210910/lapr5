import { Mapper } from "../core/infra/Mapper";

import {IBuildingDTO} from "../dto/IBuildingDTO";

import { Building } from "../domain/Building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class BuildingMap extends Mapper<Building> {

  public static toDTO( building: Building): IBuildingDTO {
    return {
      code: building.code,
      name: building.name,
      description: building.description,
      maxLength: building.maxLength,
      maxWidth: building.maxWidth
    } as IBuildingDTO;
  }

  public static async toDomain (raw: any): Promise<Building> {

    const buildingOrError = Building.create({
      code: raw.code,
      name: raw.name,
      description: raw.description,
      maxLength:raw.maxLength,
      maxWidth: raw.maxWidth
    }, new UniqueEntityID(raw.domainId))

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null ;
  }

  public static toPersistence (building: Building): any {
    const e = {
      domainId: building.id.toString(),
      code: building.code,
      name: building.name,
      description: building.description,
      maxLength:building.maxLength,
      maxWidth:building.maxWidth
    }
    return e;
  }
}
