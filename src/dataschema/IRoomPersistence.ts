import { Floor } from "../domain/floor";
import RoomDimensions from "../domain/RoomDimensions";
import RoomType from "../domain/RoomType";

export interface IRoomPersistence {
    _id: string;
    roomCode: string;
    floor: Floor;
    location: string;
    description: string;
    roomDimensions: RoomDimensions;
    roomType: RoomType;
}