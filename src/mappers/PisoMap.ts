import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import IPisoDTO from "../dto/IPisoDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PisoMap extends Mapper<Piso> {
    
    public static toDTO( piso: Piso): IPisoDTO {
        return {
            id: piso.id.toString(),
            numero: piso.numero,
            descricao: piso.descricao,
            edificio: piso.edificio
        } as IPisoDTO;
    }

    public static toDomain (piso: any | Model<IPisoPersistence & Document> ): Piso {
        const pisoOrError = Piso.create(
            piso,
            new UniqueEntityID(piso.domainId)
        );

        pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

        return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
    }

    public static toPersistence (piso: Piso): any {
        return {
            domainId: piso.id.toString(),
            numero: piso.numero,
            descricao: piso.descricao,
            edificio: piso.edificio
        }
    }
}