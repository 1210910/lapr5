import {Service, Inject} from 'typedi';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/floorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';


@Service()
export default class FloorRepo implements IFloorRepo {
    private models: any;
    
        constructor(
            @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
        ) {}

        private createBaseQuery (): any {
            return {
                where: {},
            }
        }      


        public async exists(floor: Floor): Promise<boolean> {

            const idX = floor.id instanceof Floor ? (<Floor>floor.id).toValue() : floor.id;

            const query = { domainId: idX};
            const floorDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);

            return !!floorDocument === true;
        }

        public async save (floor: Floor): Promise<Floor> {
            const query = { domainId: floor.id.toString()};

            const floorDocument = await this.floorSchema.findOne( query );

            try {
                if (floorDocument === null ) {
                    const rawFloor: any = FloorMap.toPersistence(floor);

                    const floorCreated = await this.floorSchema.create(rawFloor);

                    return FloorMap.toDomain(floorCreated);
                } else {
                    floorDocument.name = floor.name;
                    await floorDocument.save();

                    return floor;
                }
            } catch (err) {
                throw err;
            }
        }


        public async findByDomainId (floorId: string): Promise<Floor> {
            const query = { domainId: floorId};
            const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

            if (floorRecord != null) {
                return FloorMap.toDomain(floorRecord);
            }

            return null;
        }

        public async findAll (): Promise<Floor[]> {
            const floors = await this.floorSchema.find();
            return floors.map((floor) => FloorMap.toDomain(floor));
        }


        
        public async findByName (floorName: string): Promise<Floor> {
            const query = { name: floorName};
            const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

            if (floorRecord != null) {
                return FloorMap.toDomain(floorRecord);
            }

            return null;
        }



        public async findByBuildingId (buildingId: string): Promise<Floor[]> {
            const query = { buildingId: buildingId};
            const floorRecords = await this.floorSchema.find( query as FilterQuery<IFloorPersistence & Document> );

            if (floorRecords != null) {
                return floorRecords.map((floor) => FloorMap.toDomain(floor));
            }

            return null;
        }


    }     