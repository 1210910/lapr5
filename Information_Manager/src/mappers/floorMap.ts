import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorDTO from "../dto/IFloorDTO";
import { Floor } from "../domain/floor/floor";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class FloorMap extends Mapper<Floor> {

    public static toDTO( floor: Floor): IFloorDTO {
        return {
            //_id: floor.id.toString(),
            floorCode: floor.floorCode.value,
            floorNumber: floor.floorNumber.value,
            width: floor.width.value,
            length: floor.length.value,
            description: floor.description.value,
            buildingID: floor.buildingID.value
        } as IFloorDTO;
    }

    public static toDomain (floor: any | Model<IFloorPersistence & Document> ): Floor {

        const floorOrError =  Floor.create(
            floor as IFloorDTO,
            new UniqueEntityID(floor.domainId)
        );

        floorOrError.isFailure ? console.log(floorOrError.error) : '';

        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }

    public static toPersistence (floor: Floor): any {
        return {
            domainId: floor.id.toString(),
            floorCode: floor.floorCode.value,
            floorNumber: floor.floorNumber.value,
            width: floor.width.value,
            length: floor.length.value,
            description: floor.description.value,
            buildingID: floor.buildingID.value
        }
    }

    public static toDTOList (floor: Array<Floor>): Array<IFloorDTO> {
        let floorDTOList: Array<IFloorDTO> = [];
        floor.forEach((floor: Floor) => {
            floorDTOList.push(this.toDTO(floor));
        });

        return floorDTOList;
    }
}
