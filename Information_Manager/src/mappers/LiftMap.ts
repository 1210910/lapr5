import { Mapper } from "../core/infra/Mapper";

import {ILiftDTO} from "../dto/ILiftDTO";

import { Lift } from "../domain/lift/Lift";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class LiftMap extends Mapper<Lift> {


    public static toDTO( lift: Lift): ILiftDTO {
        return {
          code: lift.code.value,
          buildingCode: lift.buildingCode.value,
          floors: lift.floors.map((floor) => floor.value),
          brand: lift.brand.value,
          model: lift.model.value,
          serialNumber: lift.serialNumber.value,
          description: lift.description.value
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
          code: lift.code.value,
          buildingCode: lift.buildingCode.value,
          floors: lift.floors.map((floor) => floor.value),
          brand: lift.brand.value,
          model: lift.model.value,
          serialNumber: lift.serialNumber.value,
          description: lift.description.value
        }
        return e;
      }
      public static toDTOList(lift: Array<Lift>): Array<ILiftDTO> {
        let liftDTOList: Array<ILiftDTO> = [];
        lift.forEach((lift: Lift) => {
            liftDTOList.push(this.toDTO(lift));
        });

        return liftDTOList;
    }


}
