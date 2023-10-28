import {Service, Inject} from 'typedi';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/floorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { Result } from '../core/logic/Result';
import IFloorDTO from '../dto/IFloorDTO';

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

            const idX = floor.id instanceof Floor ? (<Floor>floor.id): floor.id;

            const query = { domainId: idX};
            const floorDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);

            return !!floorDocument === true;
        }

        public async existsByDomainId(floorId: string): Promise<boolean> {
            const query = { domainId: floorId};
            const floorDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);

            return !!floorDocument === true;
        }

        public async existsByFloorCode(code: string): Promise<boolean> {
            const query = { floorCode: code};
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

                    floorDocument.floorNumber = floor.floorNumber;
                    await floorDocument.save();

                    return floor;
                }
            } catch (err) {
                //console.log(err);
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

        public async findByFloorCode (code: string): Promise<Floor> {
            const query = { floorCode: code};
            const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

            if (floorRecord != null) {
                return FloorMap.toDomain(floorRecord);
            }

            return null;
        }

        public async findAll(): Promise<Result<Array<Floor>>>{
            const floorRecord = await this.floorSchema.find();

            const floorList : Array<Floor> = [];
            for (const floor of floorRecord) {
              floorList.push(await FloorMap.toDomain(floor));
            }
            return Result.ok<Array<Floor>>(floorList);

          }

        public async findByBuildingId (buildingId: string): Promise<Floor[]> {
            const query = { buildingID: buildingId};
            const floorRecords = await this.floorSchema.find( query as FilterQuery<IFloorPersistence & Document> );
            console.log(floorRecords);
            if (floorRecords != null && floorRecords.length > 0) {
                return floorRecords.map((floor) => FloorMap.toDomain(floor));
            }

            return null;
        }

        public async findByfloorNumberAndBuildingId (floorNumber: number, buildingId: string): Promise<Floor> {
            const query = { floorNumber: floorNumber, buildingId: buildingId};
            const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

            if (floorRecord != null) {
                return FloorMap.toDomain(floorRecord);
            }

            return null;
        }


    }
