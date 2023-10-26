import { Mapper } from "../core/infra/Mapper";

import {ILiftDTO} from "../dto/ILiftDTO";

import { Lift } from "../domain/Lift";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class LiftMap extends Mapper<Lift> {


    public static toDTO( lift: Lift): ILiftDTO {
        return {
          code: lift.code,
          buildingCode: lift.buildingCode,
          floors: lift.floors,
          brand: lift.brand,
          model: lift.model,
          serialNumber: lift.serialNumber,
          description: lift.description
        } as ILiftDTO;
      }

      public static async toDomain (raw: any): Promise<Lift> {

        const liftOrError = Lift.create({
            code: raw.code,
            buildingCode: raw.buildingCode,
            floors: raw.floors,
            brand: raw.brand,
            model: raw.model,
            serialNumber: raw.serialNumber,
            description: raw.description
        }, new UniqueEntityID(raw.domainId))

        liftOrError.isFailure ? console.log(liftOrError.error) : '';

        return liftOrError.isSuccess ? liftOrError.getValue() : null ;
      }

      public static toPersistence (lift: Lift): any {
        const e = {
          domainId: lift.id.toString(),
          code: lift.code,
          buildingCode: lift.buildingCode,
          floors: lift.floors,
          brand: lift.brand,
          model: lift.model,
          serialNumber: lift.serialNumber,
          description: lift.description
        }
        return e;
      }


}
