import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import config from '../../config';

import { Document, FilterQuery, Model } from 'mongoose';
import { ILiftPersistence } from '../dataschema/ILiftPersistance';
import ILiftRepo from '../services/IRepos/ILiftRepo';

import { Lift } from "../domain/Lift";
import { LiftId } from "../domain/LiftId";
import { LiftMap } from "../mappers/LiftMap";


@Service()
export default class LiftRepo implements ILiftRepo {

    private models: any;

 constructor(
    @Inject('liftSchema') private liftSchema : Model<ILiftPersistence & Document>,
  ) { }


  private createBaseQuery (): any {
    return {
      where: {},
    }
  }


  public async save (lift: Lift): Promise<Lift> {
    const query = { domainId: lift.id.toString() };

    const liftDocument = await this.liftSchema.findOne( query );

    try {
      if (liftDocument === null ) {
        const rawLift: any = LiftMap.toPersistence(lift);

        const liftCreated = await this.liftSchema.create(rawLift);

        return LiftMap.toDomain(liftCreated);
      } else {
        liftDocument.code = lift.code;
        liftDocument.buildingCode = lift.buildingCode;
        liftDocument.floors = lift.floors;
        liftDocument.brand = lift.brand;
        liftDocument.model = lift.model;
        liftDocument.serialNumber = lift.serialNumber;
        liftDocument.description = lift.description;
        await liftDocument.save();

        return lift;
      }
    } catch (err) {
      throw err;
    }
  }


  public async exists (liftId: LiftId | string): Promise<boolean> {

    const idX = liftId instanceof LiftId ? (<LiftId>liftId).id.toValue() : liftId;

    const query = { domainId: idX};
    const liftDocument = await this.liftSchema.findOne( query );

    return !!liftDocument === true;
  }

  public async findByCode (code: string): Promise<Lift> {
    const query = { code:code };
    const liftRecord = await this.liftSchema.findOne( query );

    if( liftRecord != null) {
      return LiftMap.toDomain(liftRecord);
    }
    else
      return null;
  }
  
  public async findAll(): Promise<Result<Array<Lift>>>{
    const liftRecord = await this.liftSchema.find();

    const liftList : Array<Lift> = [];
    for (const lift of liftRecord) {
      liftList.push(await LiftMap.toDomain(lift));
    }
    return Result.ok<Array<Lift>>(liftList);

  }

  public async findByBuildingCode (buildingCode: string): Promise<Result<Array<Lift>>> {
    const query = { buildingCode:buildingCode };
    const liftRecord = await this.liftSchema.find( query );

    const liftList : Array<Lift> = [];
    for (const lift of liftRecord) {
      liftList.push(await LiftMap.toDomain(lift));
    }
    return Result.ok<Array<Lift>>(liftList);
  }
}
