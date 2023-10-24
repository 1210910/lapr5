import { Floor } from "../domain/floor";
import { RoomType } from "../domain/RoomType";

export interface IRoomPersistence {
    _id: string;
    roomCode: string;
    floor: Floor;
    description: string;
    width : number;
    length: number;
    roomType: RoomType;
}
