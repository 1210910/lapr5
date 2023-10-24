import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';
import { Room } from "../domain/Room";
import IRoomDTO from "../dto/IRoomDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {

    public static toDTO(Room: Room): IRoomDTO {
        return {
            roomCode: Room.roomCode,
            floor: Room.floor,
            description: Room.description,
            width : Room.width,
            length : Room.length,
            roomType: Room.roomType
        } as IRoomDTO;
    }

    public static toDomain(Room: any | Model<IRoomPersistence & Document>): Room {
        const RoomOrError = Room.create(
            Room,
            new UniqueEntityID(Room.domainId)
        );

        RoomOrError.isFailure ? console.log(RoomOrError.error) : '';

        return RoomOrError.isSuccess ? RoomOrError.getValue() : null;
    }

    public static toPersistence(Room: Room): any {
        return {
            domainId: Room.id.toString(),
            roomCode: Room.roomCode,
            floor: Room.floor,
            description: Room.description,
            width: Room.width,
            length: Room.length,
            roomType: Room.roomType
        }
    }
}
