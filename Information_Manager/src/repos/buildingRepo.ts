import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import config from '../../config';

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistance';
import IFloorRepo from '../services/IRepos/IFloorRepo';


import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/Building";
import { BuildingId } from "../domain/BuildingId";
import { BuildingMap } from "../mappers/BuildingMap";


@Service()
export default class BuildingRepo implements IBuildingRepo {
 private models: any;

 constructor(
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
    @Inject(config.repos.floor.name) private FloorRepo: IFloorRepo,
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
    const query = { code: building.code };

    const buildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (buildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);
        console.log("rawBuilding: " + rawBuilding)

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.code = building.code;
        buildingDocument.name = building.name;
        buildingDocument.description = building.description;
        buildingDocument.maxLength = building.maxLength;
        buildingDocument.maxWidth = building.maxLength;
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

  public async findByCode (code: string): Promise<Building> {
    const query = { code:code };
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


  /*public async updateOne(buildingId: BuildingId | string ,building: Building): Promise<Building> {
    const query = { domainId: buildingId};
    const buildingRecord = await this.buildingSchema.updateOne(query, building);

    return BuildingMap.toDomain(buildingRecord);

  }*/

  public async findByMinMaxFloorNumber(min: number, max: number): Promise<Result<Array<Building>>> {



    const buildingRecord = await this.findAll();
    let buildingList : Building[] = [];


    if (buildingRecord != null) {

      for (let i = 0; i < buildingRecord.length ; i++) {

          const buildingFloors = await this.FloorRepo.findAllFloorsByBuildingId(buildingRecord[i].code);


            if ((buildingFloors).getValue().length >= min && (buildingFloors).getValue().length <= max) {

                buildingList.push(buildingRecord[i]);
            }



      }



      return Result.ok<Array<Building>>(buildingList);



  }
}

}

async function  sortByNumberOfFloors(buildingRecord: Array<Building>): Promise<Result<Array<Building>> | PromiseLike<Result<Array<Building>>>> {

  for (let i = 0; i < buildingRecord.length; i++) {
    for (let j = 0; j < buildingRecord.length - 1; j++) {

      let buildingFloors = this.FloorRepo.findByBuildingId(buildingRecord[j].name.toString());
      let buildingFloors2 = this.FloorRepo.findByBuildingId(buildingRecord[j + 1].name.toString());

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

