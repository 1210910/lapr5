import { Service, Inject } from 'typedi';
import config from "../../config";
import {ILiftDTO} from '../dto/ILiftDTO';
import { Lift } from "../domain/Lift";
import ILiftRepo from '../services/IRepos/ILiftRepo';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import ILiftService from './IServices/ILiftService';
import { Result } from "../core/logic/Result";
import { LiftMap } from "../mappers/LiftMap";
import { floor } from 'lodash';

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

          const checkFloors= await this.checkFloors(liftDTO.buildingCode,liftDTO.floors);

          if (!checkFloors){
            return Result.fail<ILiftDTO>("Floors code not found");
          }

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

          const liftResult = liftOrError.getValue();

          const finalLift = await this.liftRepo.save(liftResult);

          if (finalLift == null){
            return Result.fail<ILiftDTO>(finalLift);
          }
          const liftDTOResult = LiftMap.toDTO( finalLift ) as ILiftDTO;

          return Result.ok<ILiftDTO>( liftDTOResult )
        } catch (e) {
          throw e;
        }
      }

      public async updateLift(liftID : string ,liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
        try{
          const lift = await this.liftRepo.findByCode(liftDTO.code);

          if(lift == null){
            return Result.fail<ILiftDTO>("Lift not found");
          }else{
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

      

      private async checkFloors(buildingId: string,floors: string[]): Promise<boolean> {

      try {

        const floorsOfBuilding = await this.floorRepo.findByBuildingId(buildingId);
        if(floorsOfBuilding == null ){
          return false;
        }
        const floorCodes = floorsOfBuilding.map(floor => floor.floorCode);

        const allFloorsExist = floors.every(floorCode =>
          floorCodes.includes(floorCode)
        );

        return allFloorsExist;
      }catch (e){
        throw e;
      }
      }



}
