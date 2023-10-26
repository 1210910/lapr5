import {Service, Inject} from "typedi";

import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType";
import { RobotTypeMap } from "../mappers/robotTypeMap";

import { Document, FilterQuery, Model } from "mongoose";
import { IRobotTypePersistence } from "../dataschema/IRobotTypePersistence";
import { Result } from "../core/logic/Result";

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
    }