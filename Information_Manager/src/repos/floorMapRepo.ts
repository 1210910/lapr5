import { Service , Inject } from 'typedi';

import IFloorMapRepo from '../services/IRepos/IFloorMapRepo';
import { FloorMap } from '../domain/floorMap';
import { FloorMapMap } from '../mappers/floorMapMap';


import { Document, FilterQuery, Model } from 'mongoose';
import  {IFloorMapPersistence}  from '../dataschema/IFloorMapPersistence';
import { Result } from '../core/logic/Result';



@Service()
export default class FloorMapRepo implements IFloorMapRepo {

    private models: any;

    constructor(
        @Inject('floorMapSchema') private floorMapSchema : Model<IFloorMapPersistence & Document>,

    ) {}


    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async exists(floorMap: FloorMap): Promise<boolean> {

            const idX = floorMap.id instanceof FloorMap ? (<FloorMap>floorMap.id): floorMap.id;

            const query = { domainId: idX};

            const floorMapDocument = await this.floorMapSchema.findOne( query as FilterQuery<IFloorMapPersistence & Document>);

            return !!floorMapDocument === true;
        }


    public async save(floorMap: any): Promise<any> {

        const query = { domainId: floorMap.id.toString()};
        const floorMapDocument = await this.floorMapSchema.findOne( query );

        try {
            if (floorMapDocument === null) {

                console.log("floorMapDocument is null")

                const rawFloorMap: any =  FloorMapMap.toPersistence(floorMap);
                console.log("rawFloorMap: ", rawFloorMap)
                const floorMapCreated = await this.floorMapSchema.create(rawFloorMap);
                console.log("floorMapCreated: ", floorMapCreated)


                return FloorMapMap.toDomain(floorMapCreated);
            } else {
                return FloorMapMap.toDomain(floorMapDocument);
            }
        } catch (err) {
            throw err;
        }

    }
    async findByFloorCode(floorCode: string): Promise<Result<FloorMap>> {

        const query = {floorCode: floorCode};

        const floorMapDocument = await this.floorMapSchema.findOne(query as FilterQuery<IFloorMapPersistence & Document>);



        if (floorMapDocument) {
            return Result.ok<FloorMap>(FloorMapMap.toDomain(floorMapDocument));
        } else {
            return Result.fail<FloorMap>("FloorMap not found");
        }
    }

    async findAll(){
      const floorRecord = await this.floorMapSchema.find();
      const floorList: Array<FloorMap>=[]
      for (const floorMap of floorRecord){
        floorList.push(await FloorMapMap.toDomain(floorMap))
      }
      return Result.ok<Array<FloorMap>>(floorList)
    }
}
