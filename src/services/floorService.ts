import {Service, Inject} from "typedi";
import config from "../../config";
import {Floor} from "../domain/floor";
import IFloorDTO from "../dto/IFloorDTO";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import IFloorService from "./IServices/IFloorService";
import {Result} from "../core/logic/Result";
import {FloorMap} from "../mappers/floorMap";


@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
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

            const floorOrError = await Floor.create(floorDTO);

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTOResult)
        } catch (e) {
            throw e;
        }
    }

    
    public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO._id);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            } else {
                const floorOrError = Floor.create(floorDTO);

                if (floorOrError.isFailure) {
                    return Result.fail<IFloorDTO>(floorOrError.errorValue());
                }

                const floorResult = floorOrError.getValue();

                await this.floorRepo.save(floorResult);

                const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }
}