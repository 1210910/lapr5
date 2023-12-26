import { Service, Inject } from "typedi";

import { Room } from "../domain/room/Room";
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
            console.log(floor);
            const floorExists = await this.floorRepo.findByFloorCode(floor);

            if (!floorExists) {
                return Result.fail<IRoomDTO>("Floor does not exist");
            }
            roomDTO.floor = floorExists.floorCode.value;
            const roomOrError =  Room.create(roomDTO);


             if (roomDTO.length > floorExists.length.value || roomDTO.width > floorExists.width.value) {
                return Result.fail<IRoomDTO>("Room is bigger than floor");
            }

            if (roomOrError.isFailure) {
                return Result.fail<IRoomDTO>(roomOrError.errorValue());
            }

            if (!floorExists) {
                return Result.fail<IRoomDTO>("Floor does not exist");
            }
            roomDTO.floor = floorExists.floorCode.value;

            const roomResult = roomOrError.getValue();

            await this.roomRepo.save(roomResult);

            const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
            return Result.ok<IRoomDTO>(roomDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {

        try {
           const room= await this.roomRepo.findByRoomCode(roomDTO.roomCode);
            if ((room)===null) {
                return Result.fail<IRoomDTO>("Room doesn't exists");
            }


            const floorExists = await this.floorRepo.findByFloorCode(roomDTO.floor);

            roomDTO.floor = floorExists.id.toString();

            const roomOrError = await Room.edit(roomDTO,room);

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

    public async listAllRooms(): Promise<Result<Array<IRoomDTO>>> {
        try {
            const listOrError = await this.roomRepo.findAll();

            console.log(listOrError)

           if (listOrError.isFailure) {
                  return Result.fail<Array<IRoomDTO>>(listOrError.errorValue());
              }

            const roomResult = listOrError.getValue();
            console.log(roomResult)
            const roomDTOResult = RoomMap.toDTOList(roomResult) as Array<IRoomDTO>;
            return Result.ok<Array<IRoomDTO>>(roomDTOResult)
        } catch (e) {
            throw e;
        }
    }

}
