import { Service, Inject } from "typedi";

import { Room } from "../domain/Room";
import { RoomMap } from "../mappers/RoomMap";
import IRoomDTO from "../dto/IRoomDTO";
import IRoomService from "./IServices/IRoomService";
import IRoomRepo from "./IRepos/IRoomRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import { Result } from "../core/logic/Result";
import config from "../../config";


@Service()
export default class RoomService implements IRoomService {
    constructor(
        @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
    ) { }

    public async createRoom(roomDTO: IRoomDTO, floor : string): Promise<Result<IRoomDTO>> {
        try {

            const floorExists = await this.floorRepo.findByFloorCode(floor);

            if (!floorExists) {
                return Result.fail<IRoomDTO>("Floor does not exist");
            }
            roomDTO.floor = floorExists.floorCode;
            const roomOrError =  Room.create(roomDTO);


             if (roomDTO.length > floorExists.length || roomDTO.width > floorExists.width) {
                return Result.fail<IRoomDTO>("Room is bigger than floor");
            }

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

    /*public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        console.log("Not implemented yet");
        return null;
    }*/

    /*public async listRoom(): Promise<Result<Array<IRoomDTO>>> {
        try {
            const listOrError = await this.roomRepo.findAll();

            if (listOrError.isFailure) {
                return Result.fail<Array<IRoomDTO>>(listOrError.errorValue());
            }

            const roomResult = listOrError.getValue();

            const roomDTOResult = RoomMap.toDTOList(roomResult) as Array<IRoomDTO>;
            return Result.ok<Array<IRoomDTO>>(roomDTOResult)
        } catch (e) {
            throw e;
        }
    }*/

}
