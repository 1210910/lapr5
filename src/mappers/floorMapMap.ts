import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorMapDTO from "../dto/IFloorMapDTO";
import { FloorMap } from "../domain/floorMap";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { floor } from "lodash";

export class FloorMapMap extends Mapper<FloorMap> {

    public static toDTO( floorMap: FloorMap): IFloorMapDTO {
        return {
            //_id: floorMap.id.toString(),
            floorCode: floorMap.floorCode,
            map: floorMap.map
            
        } as IFloorMapDTO;
    }

    public static toDomain( raw: any | Model<IFloorPersistence & Document> ): FloorMap {

        const floorMapOrError = FloorMap.create(
            {
                floorCode: raw.floorCode,
                map: raw.map
            },
            new UniqueEntityID(raw._id)
                
        );

        if (floorMapOrError.isFailure) {
            throw new Error(floorMapOrError.error.toString());
        }


        return floorMapOrError.getValue();
    }
}