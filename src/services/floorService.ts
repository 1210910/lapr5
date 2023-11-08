import {Service, Inject} from "typedi";
import config from "../../config";
import {Floor} from "../domain/floor";
import IFloorDTO from "../dto/IFloorDTO";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import IFloorService from "./IServices/IFloorService";
import IBuildingRepo from "../services/IRepos/IBuildingRepo"
import {Result} from "../core/logic/Result";
import {FloorMap} from "../mappers/floorMap";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import IPassagewayRepo from "./IRepos/IPassagewayRepo";


@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private FloorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
        @Inject(config.repos.passageway.name) private passagewayRepo : IPassagewayRepo
    ) {
    }


    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            const buildingExists = await this.buildingRepo.findByCode(floorDTO.buildingID);
            console.log("tou aqui");
           if (!buildingExists) {
               return Result.fail<IFloorDTO>("Building not found");
            }
          console.log("tou aqui 2");

            if (buildingExists.maxLength < floorDTO.length || buildingExists.maxWidth < floorDTO.width) {
                return Result.fail<IFloorDTO>("Floor is too big for building");
            }
          console.log("tou aqui 3");
            const floorExists = await this.FloorRepo.existsByFloorCode(floorDTO.floorCode);
          console.log("tou aqui 4");
          if (floorExists) {
                return Result.fail<IFloorDTO>("Floor already exists");
            }
          console.log("tou aqui 5");
            let Id = "FLR";
            let i = 0;


           // check repo for last id and increment
           // while the id exists in the repo, increment a:

           while ( (await this.FloorRepo.existsByDomainId(Id + i)).valueOf() == true ) {
               i++;
           }

           let id = Id.concat(i.toString());


          console.log("tou aqui 6");

            const floorOrError =  Floor.create(floorDTO, new UniqueEntityID(id));

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }
            console.log("tou aqui 7");
            const floorResult = floorOrError.getValue();


            await this.FloorRepo.save(floorResult);
            console.log("tou aqui 8");
            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
          console.log("tou aqui 9");
            return Result.ok<IFloorDTO>(floorDTOResult)
        } catch (e) {
            throw e;
        }
    }


    public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
         const floor = await this.FloorRepo.findByFloorCode(floorDTO.floorCode);


            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            } else {

                const floorOrError =  Floor.edit(floorDTO, floor);

                if (floorOrError.isFailure) {

                    return Result.fail<IFloorDTO>(floorOrError.errorValue());
                }

                const floorResult = floorOrError.getValue();


                await this.FloorRepo.save(floorResult);
                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult)
            }

        } catch (e) {
            throw e;
        }
    }
    public async listFloor(): Promise<Result<Array<IFloorDTO>>> {
        try {
            const floorOrError = await this.FloorRepo.findAll();
            if (floorOrError.isFailure) {
                return Result.fail<Array<IFloorDTO>>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            const floorDTOList = FloorMap.toDTOList(floorResult) as Array<IFloorDTO>;
            return Result.ok<Array<IFloorDTO>>(floorDTOList)
        } catch (e) {
            throw e;
        }
    }

    public async getFloorsWithPassageway(buildingCode: string): Promise<Result<Array<IFloorDTO>>>{
        try {
            let floors: Array<IFloorDTO> = [];

            const floorListOrError = await this.FloorRepo.findByBuildingId(buildingCode);
            if (!floorListOrError) {
                return Result.fail<Array<IFloorDTO>>("Floor not found");
            }
            const floorList = floorListOrError.map(floor => floor);

            const passagewayListOrError = await this.passagewayRepo.findAll();
            if (passagewayListOrError.isFailure) {
                return Result.fail<Array<IFloorDTO>>("There are no passageways");
            }
            const passagewayResult = passagewayListOrError.getValue();

            floorList.forEach(async floor => {
                passagewayResult.forEach(passageway => {
                    if (passageway.floor1 == floor.floorCode || passageway.floor2 == floor.floorCode) {
                        floors.push(floor);
                    }
                });
            }
            );
            return Result.ok<Array<IFloorDTO>>(floors);
        } catch (e) {
            throw e;
        }

    }

}

