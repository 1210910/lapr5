import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/room/Room";
import { RoomId } from "../../domain/room/RoomId";
import {Result} from "../../core/logic/Result";

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findAll(): Promise<Result<Array<Room>>>;
  findByRoomCode(roomCode: Room | string): Promise<Room>;
  exists(roomId: RoomId | string): Promise<boolean>;
  findByCode(roomCode: Room | string): Promise<Room>;
}
