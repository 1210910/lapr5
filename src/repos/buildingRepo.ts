import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistance';

import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/Building";
import { BuildingId } from "../domain/BuildingId";
import { BuildingMap } from "../mappers/BuildingMap";
import  FloorRepo from './floorRepo';

@Service()
export default class BuildingRepo implements IBuildingRepo {
 private models: any;

 constructor(
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
    @Inject('logger') private logger
  ) { }


    private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (buildingId: BuildingId | string): Promise<boolean> {

    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;

    const query = { domainId: idX}; 
    const buildingDocument = await this.buildingSchema.findOne( query );

    return !!buildingDocument === true;
  }


  public async save (building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() }; 

    const buildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (buildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.name = building.name;
        buildingDocument.description = building.description;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findById (buildingId: BuildingId | string): Promise<Building> {

    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;

    const query = { domainId: idX }; 
    const buildingRecord = await this.buildingSchema.findOne( query );

    if( buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    else
      return null;
  }

  
  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();
    const buildings = await Promise.all(buildingRecords.map(async (buildingRecord) =>
      await BuildingMap.toDomain(buildingRecord)
    ));
    return buildings;
  }

  public async findByMinMaxFloorNumber(min: number, max: number): Promise<Result<Array<Building>>> {
    
    const floorRepo = new FloorRepo(this.logger);

    const buildingRecord = await this.findAll();

    if (buildingRecord != null) {
      for (let i = 0; i < buildingRecord.keys.length ; i++) {
        if (buildingRecord[i].name.length > 0) {

          const buildingFloors = floorRepo.findByBuildingId(buildingRecord[i].name.toString());
          if  ((await buildingFloors) != null) {
            if ((await buildingFloors).keys.length < min || (await buildingFloors).keys.length > max) {
              buildingRecord.splice(i, 1);
            }
          }
        
        }
      }
        
      return  (await sortByNumberOfFloors(buildingRecord));
    

    
  }
}

}
  
async function  sortByNumberOfFloors(buildingRecord: Array<Building>): Promise<Result<Array<Building>> | PromiseLike<Result<Array<Building>>>> {
  const floorRepo = new FloorRepo(this.logger);
  for (let i = 0; i < buildingRecord.length; i++) {
    for (let j = 0; j < buildingRecord.length - 1; j++) {

      let buildingFloors = floorRepo.findByBuildingId(buildingRecord[j].name.toString());
      let buildingFloors2 = floorRepo.findByBuildingId(buildingRecord[j + 1].name.toString());

      if ((buildingFloors != null) && (buildingFloors2 != null)) {
        if ((await buildingFloors).keys.length > (await buildingFloors2).keys.length) {
          let temp = buildingRecord[j];
          buildingRecord[j] = buildingRecord[j + 1];
          buildingRecord[j + 1] = temp;
        }
      }
    }
  }
  return Result.ok<Array<Building>>(await buildingRecord);
}

