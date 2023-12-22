import { Service, Inject } from 'typedi';
import config from "../../config";
import {IBuildingDTO} from '../dto/IBuildingDTO';
import { Building } from "../domain/building/Building";
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";



@Service()
export default class BuildingService implements IBuildingService{
    constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo

    ) {}



    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
          const buildingDocument = await this.buildingRepo.findByCode(buildingDTO.code)

          const found = !!buildingDocument;
          if (found) {
            return Result.fail<IBuildingDTO>("Building already exists with code = " + buildingDTO.code);
          }
          const buildingOrError = await Building.create(buildingDTO);

          if (buildingOrError.isFailure) {
            return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
          }

          const buildingResult = buildingOrError.getValue();


          const finalBuilding = await  this.buildingRepo.save(buildingResult);
          if (!finalBuilding){
            return Result.fail<IBuildingDTO>("Building not saved");
          }
          const buildingDTOResult = BuildingMap.toDTO( finalBuilding ) as IBuildingDTO;

          return Result.ok<IBuildingDTO>( buildingDTOResult )
        } catch (e) {
          throw e;
        }
      }

      public async getAllBuildings(): Promise<Result<IBuildingDTO[]>> {
        try {
          const buildingPromises = await this.buildingRepo.findAll();
          if (!buildingPromises) {
            return Result.fail<IBuildingDTO[]>("No buildings found");
          }
          const buildings = await Promise.all(buildingPromises);
          const buildingDTO = buildings.map( b => BuildingMap.toDTO(b));
          return Result.ok<IBuildingDTO[]>( buildingDTO )
        } catch (e) {
          throw e;
        }
      }

      public async getBuildingsMinMax(min: string, max: string): Promise<Result<Array<IBuildingDTO>>> {

        try {
          const minNumber = parseInt(min);
          const maxNumber = parseInt(max);


          const buildingsOrError = await this.buildingRepo.findByMinMaxFloorNumber(minNumber, maxNumber);

          if (buildingsOrError.isFailure) {
            return Result.fail<IBuildingDTO[]>(buildingsOrError.errorValue());
          }


          const buildings = buildingsOrError.getValue();

          const buildingDTO = buildings.map( b => BuildingMap.toDTO(b));
          return Result.ok<IBuildingDTO[]>( buildingDTO )
        } catch (e) {
          throw e;
        }
      }

      public async editBuilding(code:string , buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {

          const buildingDocument = await this.buildingRepo.findByCode(code);

          const found = !!buildingDocument;
          if (!found) {
            return Result.fail<IBuildingDTO>("Can not find building with code = " + code);
          }
          const buildingOrError = Building.edit(buildingDTO, buildingDocument);

          const test = buildingOrError.getValue();
          const finalBuilding = await this.buildingRepo.save(test);

          if (!finalBuilding){
            return Result.fail<IBuildingDTO>("building not saved");
          }

          const buildingDTOResult = BuildingMap.toDTO( test ) as IBuildingDTO;

          return Result.ok<IBuildingDTO>( buildingDTOResult )
        } catch (e) {
          throw e;
        }
      }

}
