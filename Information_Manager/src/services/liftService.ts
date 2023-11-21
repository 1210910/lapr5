import { Service, Inject } from 'typedi';
import config from "../../config";
import {ILiftDTO} from '../dto/ILiftDTO';
import { Lift } from "../domain/Lift";
import ILiftRepo from '../services/IRepos/ILiftRepo';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import ILiftService from './IServices/ILiftService';
import { Result } from "../core/logic/Result";
import { LiftMap } from "../mappers/LiftMap";
import {Floor} from "../domain/floor";
import {forEach} from "lodash";

@Service()
export default class LiftService implements ILiftService{
    constructor(
        @Inject(config.repos.lift.name) private liftRepo : ILiftRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
    ) {}

    public async createLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
        try {

          const liftDocument = await this.liftRepo.findByCode(liftDTO.code);
          const found = !!liftDocument;
          if (found) {
            return Result.fail<ILiftDTO>("Lift already exists with code = " + liftDTO.code);
          }

          const checkIfAlreadyHasLift = await this.liftRepo.findIfBuildingAlreadyHasLift(liftDTO.buildingCode);
          if(checkIfAlreadyHasLift){
            return Result.fail<ILiftDTO>("Building already as a lift");
          }

          const checkFloors= await this.checkFloors(liftDTO.buildingCode,liftDTO.floors);

          if (checkFloors== null) {
            return Result.fail<ILiftDTO>("Error in floor codes not found");
          }

          //change the list of floorsCodes to the list of floor ids
          const floorIds = checkFloors.map(floor => floor.id.toString());
          const floorCodes = liftDTO.floors;
          liftDTO.floors = floorIds;

          const liftOrError = await Lift.create({
            code: liftDTO.code,
            buildingCode: liftDTO.buildingCode,
            floors: liftDTO.floors,
            brand: liftDTO.brand,
            model: liftDTO.model,
            serialNumber: liftDTO.serialNumber,
            description: liftDTO.description
          });

          if (liftOrError.isFailure) {
            return Result.fail<ILiftDTO>(liftOrError.errorValue());
          }

          await this.liftRepo.save(liftOrError.getValue());

          const liftDTOResult = LiftMap.toDTO( liftOrError.getValue() ) as ILiftDTO;

          return Result.ok<ILiftDTO>( liftDTOResult )
        } catch (e) {
          throw e;
        }
      }

      public async updateLift(liftID : string ,liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
        try{
          const lift = await this.liftRepo.findByCode(liftID);
          if(lift == null){
            return Result.fail<ILiftDTO>("Lift not found");
          }else{
            const checkFloors= await this.checkFloors(lift.buildingCode,liftDTO.floors);
            if(checkFloors== null){
              return Result.fail<ILiftDTO>("Floor does not exist in this building");
            }
            liftDTO.floors = checkFloors.map(floor => floor.id.toString());
            const liftOrError = Lift.update(lift, liftDTO);
            if(liftOrError.isFailure){
              return Result.fail<ILiftDTO>(liftOrError.errorValue());
            }
            const liftResult = liftOrError.getValue();

            await this.liftRepo.save(liftResult);
            const liftDTOResult = LiftMap.toDTO(lift) as ILiftDTO;
            return Result.ok<ILiftDTO>(liftDTOResult)
          }
        }
        catch (e){
          throw e;
        }
      }

      public async listLift(buildingCode : string): Promise<Result<Array<ILiftDTO>>> {
        try {
            const liftOrError = await this.liftRepo.findByBuildingCode(buildingCode);
            if (liftOrError.isFailure) {
                return Result.fail<Array<ILiftDTO>>(liftOrError.errorValue());
            }

            const liftResult = liftOrError.getValue();

            const liftDTOList = LiftMap.toDTOList(liftResult) as Array<ILiftDTO>;
            return Result.ok<Array<ILiftDTO>>(liftDTOList)
        } catch (e) {
            throw e;
        }
    }

    public async listAllLift(): Promise<Result<Array<ILiftDTO>>> {
      try {
       const liftOrError = await this.liftRepo.findAll();
       if (liftOrError.isFailure) {
        return Result.fail<Array<ILiftDTO>>(liftOrError.errorValue());
       }

      const liftResult = liftOrError.getValue();

      const liftDTOList = LiftMap.toDTOList(liftResult) as Array<ILiftDTO>;
      return Result.ok<Array<ILiftDTO>>(liftDTOList)
      } catch (e) {
      throw e;
    }
  }



      private async checkFloors(buildingId: string,floors: string[]): Promise<Array<Floor>> {

      try {

        const floorsOfBuilding = await this.floorRepo.findByBuildingId(buildingId);
        if(floorsOfBuilding == null  ){
          return null;
        }
        const floorCodes = floorsOfBuilding.map(floor => floor.floorCode);

        const allFloorsExist = floors.every(floorCode =>
          floorCodes.includes(floorCode)
        );
        if (!allFloorsExist) {
          return null;
        }else{
          return floorsOfBuilding;
        }


      }catch (e){
        throw e;
      }
      }



}
