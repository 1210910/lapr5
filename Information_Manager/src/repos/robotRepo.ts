import { Service, Inject } from 'typedi';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot/robot";
import { RobotId } from "../domain/robot/robotId";
import { RobotMap } from "../mappers/robotMap";
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import { Result } from "../core/logic/Result";
import { Document, FilterQuery, Model } from 'mongoose';
import { code } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import { Building } from "../domain/building/Building";
import { BuildingMap } from "../mappers/BuildingMap";


@Service()
export default class RobotRepo implements IRobotRepo {
    private models: any;

    constructor(
        @Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(RobotId: RobotId): Promise<boolean> {
        const query = { domainId: RobotId };

        const robotDocument = await this.robotSchema.findOne(query);

        return !!robotDocument === true;
    }

    public async existsByCode(robotCode: string): Promise<boolean> {
        const query = { code: robotCode };

        const robotDocument = await this.robotSchema.findOne(query);

        return !!robotDocument === true;
    }

    public async save(robot: Robot): Promise<Robot> {
        const query = { code: robot.code.value };

        const robotDocument = await this.robotSchema.findOne(query);

        try {
            if (robotDocument === null) {
                const rawRobot: any = RobotMap.toPersistence(robot);

                const robotCreated = await this.robotSchema.create(rawRobot);

                return RobotMap.toDomain(robotCreated);
            } else {
                robotDocument.code = robot.code.value;
                robotDocument.name = robot.name.value;
                robotDocument.type = robot.type.value;
                robotDocument.enabled = robot.enabled;
                robotDocument.description = robot.description.value;

                await robotDocument.save();

                return RobotMap.toDomain(robotDocument);
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByCode(code: string): Promise<Robot> {
        const query = { code: code };

        const robotDocument = await this.robotSchema.findOne(query);

        if (robotDocument != null) {
            return RobotMap.toDomain(robotDocument);
        }
        return null;
    }

    async  findByType(robotType: Robot | string): Promise<Array<Robot>> {
        const query = { type: robotType };

        const robotDocuments = await this.robotSchema.find(query);

        if (robotDocuments != null) {
            const robot =  Promise.all(robotDocuments.map(async (robotDocument) => await RobotMap.toDomain(robotDocument)));
            return robot;
        }
        return null;
    }


    public async findAll(): Promise<Array<Robot>> {
    const robotRecords = await this.robotSchema.find();
    const robots = await Promise.all(robotRecords.map(async (robotRecord) =>
      await RobotMap.toDomain(robotRecord)
    ));
    return robots;
  }
}
