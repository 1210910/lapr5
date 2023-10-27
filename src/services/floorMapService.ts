import {Service, Inject} from "typedi";
import config from "../../config";
import {FloorMap} from "../domain/floorMap";
import IFloorMapDTO from "../dto/IFloorMapDTO";
import IFloorMapRepo from "../services/IRepos/IFloorMapRepo";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import IRoomRepo from "./IRepos/IRoomRepo";
import ILiftRepo from "./IRepos/ILiftRepo";
import IFloorMapService from "./IServices/IFloorMapService";
import {Result} from "../core/logic/Result";
import { FloorMapMap } from "../mappers/floorMapMap";
import { floor } from "lodash";



@Service()
export default class FloorMapService implements IFloorMapService {

    constructor(@Inject(config.repos.floorMap.name) private floorMapRepo : IFloorMapRepo,
                @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
                @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
                @Inject(config.repos.lift.name) private elevatorRepo : ILiftRepo

    ) {}

    public async createFloorMap(floorMapDTO: IFloorMapDTO): Promise<Result<IFloorMapDTO>> {

        try {
           
            const floorExists = await this.floorRepo.existsByFloorCode(floorMapDTO.floorCode);
            
            if (!floorExists) {
                return Result.fail<IFloorMapDTO>("Floor not found");
            }

           floorMapDTO.rooms.forEach(async (room) => {
                const roomExists = await this.roomRepo.exists(room.roomCode);

                if (!roomExists) {
                    return Result.fail<IFloorMapDTO>("Room not found");
                }
            });
            
            const elevatorExists = await this.elevatorRepo.findByCode(floorMapDTO.elevator[0].elevatorCode);
            
            if (elevatorExists === null) {
                return Result.fail<IFloorMapDTO>("Elevator not found");
            }
            
            const floor = await this.floorRepo.findByFloorCode(floorMapDTO.floorCode);
        
            floorMapDTO.map= new Array(floor.width).fill(new Array(floor.length).fill(0));

            floorMapDTO.rooms.forEach(async (room) => {
                
                const roomExists = await this.roomRepo.findByRoomCode(room.roomCode);
                

                for (let i = room.positionX; i < room.positionX + roomExists.width; i++) {
                    for (let j = room.positionY; j < room.positionY + roomExists.length; j++) {
                        floorMapDTO.map[i][j]= room.roomCode;
                    
                    }
                }
              
    
            });


            floorMapDTO.map[floorMapDTO.elevator[0].positionX][floorMapDTO.elevator[0].positionY] = floorMapDTO.elevator[0].elevatorCode;

         
            const floorMapOrError = FloorMap.create(floorMapDTO);
           
            if (floorMapOrError.isFailure) {
                return Result.fail<IFloorMapDTO>("floorMapOrError.errorValue()");
            }

            const floorMapResult = floorMapOrError.getValue();

            await this.floorMapRepo.save(floorMapResult);

            

            const floorMapDTOResult = FloorMapMap.toDTO(floorMapResult) as IFloorMapDTO;

            return Result.ok<IFloorMapDTO>(floorMapDTOResult);
        }catch (e) {
            throw e;
        }

    }
    


}
