import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
    createRoom(roomDTO: IRoomDTO, floor : string): Promise<Result<IRoomDTO>>;
    //updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
    //listRoom (): Promise<Result<Array<IRoomDTO>>>;
}
