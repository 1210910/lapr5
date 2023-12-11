import {Service, Inject} from "typedi";

import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType/robotType";
import { RobotTypeMap } from "../mappers/robotTypeMap";

import { Document, FilterQuery, Model } from "mongoose";
import { IRobotTypePersistence } from "../dataschema/IRobotTypePersistence";
import { Result } from "../core/logic/Result";
import {Robot} from "../domain/robot/robot";
import {RobotMap} from "../mappers/robotMap";

@Service()
    export default class RobotTypeRepo implements IRobotTypeRepo {
        private models: any;

            constructor(
                @Inject("robotTypeSchema") private robotTypeSchema : Model<IRobotTypePersistence & Document>,
                 
            ) {}

            private createBaseQuery (): any {
                return {
                    where: {},
                }
            }   

            public async exists(robotType: RobotType): Promise<boolean> {
                    
                    const idX = robotType.id instanceof RobotType ? (<RobotType>robotType.id): robotType.id;
    
                    const query = { domainId: idX};
                    const robotTypeDocument = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document>);
    
                    return !!robotTypeDocument === true;
                }

            public async existsByCode(robotTypeCode: string): Promise<boolean> {
                const query = { code: robotTypeCode };
                const robotTypeDocument = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document>);
                return !!robotTypeDocument === true;
            }

            public async save(robotType: RobotType): Promise<RobotType> {
                
                const query = { domainId: robotType.id.toString()};

                const robotTypeDocument= await this.robotTypeSchema.findOne( query );

                try {
                    if (robotTypeDocument === null) {
                        const rawRobotType: any = RobotTypeMap.toPersistence(robotType);
                        const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);
                        return RobotTypeMap.toDomain(robotTypeCreated);
                    } else {
                    
                        return RobotTypeMap.toDomain(robotTypeDocument);

                        
                    }
                }
                catch (err) {
                    throw err;
                }


            }

    public async findAll(): Promise<Array<RobotType>> {
        const robotTypeRecords = await this.robotTypeSchema.find();
        const robotTypes = await Promise.all(robotTypeRecords.map(async (robotTypeRecord) =>
            await RobotTypeMap.toDomain(robotTypeRecord)
        ));
        return robotTypes;
    }
}