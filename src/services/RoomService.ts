import { Service, Inject } from "typedi";
import config from "../../config";
import { Room } from "../domain/Room";
import { RoomMap } from "../mappers/RoomMap";
import IRoomDTO from "../dto/IRoomDTO";
import IRoomService from "./IServices/IRoomService";
import IRoomRepo from "./IRepos/IRoomRepo";
import { Result } from "../core/logic/Result";


@Service()
export default class RoomService implements IRoomService {
    constructor(
        @Inject(config.repos.room.name) private roomRepo: IRoomRepo
    ) { }

    public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        try {

            const roomOrError = await Room.create(roomDTO);

            if (roomOrError.isFailure) {
                return Result.fail<IRoomDTO>(roomOrError.errorValue());
            }

            const roomResult = roomOrError.getValue();

            await this.roomRepo.save(roomResult);

            const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
            return Result.ok<IRoomDTO>(roomDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        console.log("Not implemented yet");
        return null;
    }
    
    public async listRoom(): Promise<Result<IRoomDTO[]>> {
        console.log("Not implemented yet");
        return null;
    }

}
