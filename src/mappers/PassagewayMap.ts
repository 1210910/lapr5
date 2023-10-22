import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPassagewayPersistence } from '../dataschema/IPassagewayPersistence';
import { Passageway } from "../domain/Passageway";
import IPassagewayDTO from "../dto/IPassagewayDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PassagewayMap extends Mapper<Passageway> {

    public static toDTO(passageway: Passageway): IPassagewayDTO {
        return {
            passageCode: passageway.passageCode,
            floor1: passageway.floor1,
            floor2: passageway.floor2
        } as IPassagewayDTO;
    }

    public static toDomain(passageway: any | Model<IPassagewayPersistence & Document>): Passageway {
        const passagewayOrError = Passageway.create(
            passageway,
            new UniqueEntityID(passageway.domainId)
        );

        passagewayOrError.isFailure ? console.log(passagewayOrError.error) : '';

        return passagewayOrError.isSuccess ? passagewayOrError.getValue() : null;
    }

    public static toPersistence(passageway: Passageway): any {
        return {
            domainId: passageway.id.toString(),
            passageCode: passageway.passageCode,
            floor1: passageway.floor1,
            floor2: passageway.floor2
        }
    }
}