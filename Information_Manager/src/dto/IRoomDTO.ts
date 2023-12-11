import { Floor } from "../domain/floor/floor";
import { RoomType } from "../domain/room/RoomType";

export default interface IRoomDTO{
    roomCode: string;
    floor: string;
    description: string;
    width: number;
    length: number;
    roomType: string;
}
