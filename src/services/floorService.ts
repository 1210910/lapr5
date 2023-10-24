import {Service, Inject} from "typedi";
import config from "../../config";
import {Floor} from "../domain/floor";
import IFloorDTO from "../dto/IFloorDTO";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import IFloorService from "./IServices/IFloorService";
import IBuildingRepo from "../services/IRepos/IBuildingRepo"
import {Result} from "../core/logic/Result";
import {FloorMap} from "../mappers/floorMap";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {
    }

    public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            } else {
                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }


    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            
            const buildingExists = await this.buildingRepo.findById(floorDTO.buildingID);
            
            if (!buildingExists) {
                return Result.fail<IFloorDTO>("Building not found");
            }

            const Id = floorIDGenerator();

            const floorOrError = await Floor.create(floorDTO, new UniqueEntityID(Id));

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            function randomString(): string {
                const length = (Math.random() < 0.5) ? 5 : 7;
                return (Math.random() + 1).toString(36).substring(length);
            }

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTOResult)
        } catch (e) {
            throw e;
        }
    }

    
    public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByfloorNumberAndBuildingId(floorDTO.floorNumber, floorDTO.buildingID);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            } else {
                const buildingExists = await this.buildingRepo.findById(floorDTO.buildingID);

            }
        } catch (e) {
            throw e;
        }
    }
}
    function floorIDGenerator() : string {
        let id = "FLR";
        let i = 0;
       // check repo for last id and increment
       if (this.floorRepo.findByDomainId(id + i)==null) {
            return id + i;
       }
    }
  