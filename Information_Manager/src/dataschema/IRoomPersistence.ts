import { Floor } from "../domain/floor/floor";
import { RoomType } from "../domain/room/RoomType";

export interface IRoomPersistence {
    _id: string;
    roomCode: string;
    floor: string;
    description: string;
    width : number;
    length: number;
    roomType: RoomType;
}
