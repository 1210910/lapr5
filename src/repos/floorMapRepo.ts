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
                
                const rawFloorMap: any = await FloorMapMap.toPersistence(floorMap);
                const floorMapCreated = await this.floorMapSchema.create(rawFloorMap);
             
                return FloorMapMap.toDomain(floorMapCreated);
            } else {
                return FloorMapMap.toDomain(floorMapDocument);
            }
        } catch (err) {
            throw err;
        }
        
    }
}
