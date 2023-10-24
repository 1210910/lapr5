import { Floor } from "../domain/floor";
import { RoomType } from "../domain/RoomType";

export default interface IRoomDTO{
    roomCode: string;
    floor: Floor;
    description: string;
    width: number;
    length: number;
    roomType: RoomType;
}
