import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';
import { Room } from "../domain/room/Room";
import IRoomDTO from "../dto/IRoomDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { find, floor } from "lodash";

export class RoomMap extends Mapper<Room> {

    public static toDTO(Room: Room): IRoomDTO {
        return {
            roomCode: Room.roomCode.value,
            floor: Room.floor.value,
            description: Room.description.value,
            width : Room.width.value,
            length : Room.length.value,
            roomType: Room.roomType
        } as IRoomDTO;
    }

    public static toDomain(room: any | Model<IRoomPersistence & Document>): Room {
        const roomOrError = Room.create(
            room,
            new UniqueEntityID(room.domainId)
        );



        roomOrError.isFailure ? console.log(roomOrError.error) : '';

        return roomOrError.isSuccess ? roomOrError.getValue() : null;
    }

    public static toPersistence(Room: Room): any {
        return {
            domainId: Room.id.toString(),
            roomCode: Room.roomCode.value,
            floor: Room.floor.value,
            description: Room.description.value,
            width: Room.width.value,
            length: Room.length.value,
            roomType: Room.roomType
        }
    }
    public static toDTOList(room: Array<Room>): Array<IRoomDTO> {
        let roomDTOList: Array<IRoomDTO> = [];
        room.forEach((room: Room) => {
            roomDTOList.push(this.toDTO(room));
        });

        return roomDTOList;
    }
}
