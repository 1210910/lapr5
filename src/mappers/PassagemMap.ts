import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';
import { Passagem } from "../domain/Passagem";
import IPassagemDTO from "../dto/IPassagemDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PassagemMap extends Mapper<Passagem> {

    public static toDTO(passagem: Passagem): IPassagemDTO {
        return {
            passageCode: passagem.passageCode,
            piso1: passagem.piso1,
            piso2: passagem.piso2
        } as IPassagemDTO;
    }

    public static toDomain(passagem: any | Model<IPassagemPersistence & Document>): Passagem {
        const passagemOrError = Passagem.create(
            passagem,
            new UniqueEntityID(passagem.domainId)
        );

        passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

        return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
    }

    public static toPersistence(passagem: Passagem): any {
        return {
            domainId: passagem.id.toString(),
            passageCode: passagem.passageCode,
            piso1: passagem.piso1,
            piso2: passagem.piso2
        }
    }
}