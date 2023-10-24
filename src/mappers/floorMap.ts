import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorDTO from "../dto/IFloorDTO";
import { Floor } from "../domain/floor";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class FloorMap extends Mapper<Floor> {
    
    public static toDTO( floor: Floor): IFloorDTO {
        return {
            //_id: floor.id.toString(),
            floorNumber: floor.floorNumber,
            dimension: floor.dimension,
            description: floor.description,
            buildingID: floor.buildingID
        } as IFloorDTO;
    }

    public static toDomain (floor: any | Model<IFloorPersistence & Document> ): Floor {
        const floorOrError =  Floor.create(
            floor,
            new UniqueEntityID(floor.domainId)
        );
        console.log("floorMap.toDomain: " + floor.domainId);
        floorOrError.isFailure ? console.log(floorOrError.error) : '';

        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }

    public static toPersistence (floor: Floor): any {
        return {
            domainId: floor.id.toString(),
            floorNumber: floor.floorNumber,
            dimension: floor.dimension,
            description: floor.description,
            buildingID: floor.buildingID
        }
    }
}