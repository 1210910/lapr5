import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/Room";
import { RoomId } from "../../domain/RoomId";

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findAll(): Promise<Room[]>;
  findByRoomCode(roomCode: Room | string): Promise<Room>;
  exists(roomId: RoomId | string): Promise<boolean>;
  findByCode(roomCode: Room | string): Promise<Room>;
}