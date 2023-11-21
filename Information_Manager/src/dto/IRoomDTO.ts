import { Floor } from "../domain/floor";
import { RoomType } from "../domain/RoomType";

export default interface IRoomDTO{
    roomCode: string;
    floor: string;
    description: string;
    width: number;
    length: number;
    roomType: string;
}
