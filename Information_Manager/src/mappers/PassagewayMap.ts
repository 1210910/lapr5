import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPassagewayPersistence } from '../dataschema/IPassagewayPersistence';
import { Passageway } from "../domain/passageway/Passageway";
import IPassagewayDTO from "../dto/IPassagewayDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Building } from "../domain/building/Building";

export class PassagewayMap extends Mapper<Passageway> {

    public static toDTO(passageway: Passageway): IPassagewayDTO {
        return {
            passageCode: passageway.passageCode.value,
            floor1: passageway.floor1.value,
            floor2: passageway.floor2.value,
            description: passageway.description.value
        } as IPassagewayDTO;
    }

  /*  public static toDomain(passageway: any | Model<IPassagewayPersistence & Document>): Passageway {
        const passagewayOrError = Passageway.create(
            passageway,
            new UniqueEntityID(passageway.domainId)
        );

        passagewayOrError.isFailure ? console.log(passagewayOrError.error) : '';

        return passagewayOrError.isSuccess ? passagewayOrError.getValue() : null;
    }*/

  public static async toDomain (raw: any): Promise<Passageway> {

    const buildingOrError = Passageway.create({
      passageCode: raw.passageCode,
      floor1: raw.floor1,
      floor2: raw.floor2,
      description:raw.description,
    }, new UniqueEntityID(raw.domainId))

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null ;
  }


  public static toPersistence(passageway: Passageway): any {
        return {
            domainId: passageway.id.toString(),
            passageCode: passageway.passageCode.value,
            floor1: passageway.floor1.value,
            floor2: passageway.floor2.value,
            description: passageway.description.value
        }
    }

    public static toDTOList(passageway: Array<Passageway>): Array<IPassagewayDTO> {
        let passagewayDTOList: Array<IPassagewayDTO> = [];
        passageway.forEach((passageway: Passageway) => {
            passagewayDTOList.push(this.toDTO(passageway));
        });

        return passagewayDTOList;
    }
}
