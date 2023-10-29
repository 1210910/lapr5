import { Service, Inject } from 'typedi';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";
import { RobotMap } from "../mappers/robotMap";
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import { Result } from "../core/logic/Result";
import { Document, FilterQuery, Model } from 'mongoose';

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
        const query = { code: robot.code };

        const robotDocument = await this.robotSchema.findOne(query);

        try {
            if (robotDocument === null) {
                const rawRobot: any = RobotMap.toPersistence(robot);

                const robotCreated = await this.robotSchema.create(rawRobot);

                return RobotMap.toDomain(robotCreated);
            } else {
                robotDocument.code = robot.code;
                robotDocument.name = robot.name;
                robotDocument.type = robot.type;
                robotDocument.enabled = robot.enabled;
                robotDocument.description = robot.description;

                await robotDocument.save();

                return RobotMap.toDomain(robotDocument);
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByCode(robotCode: string): Promise<Robot> {
        const query = { robotCode: robotCode };

        const robotDocument = await this.robotSchema.findOne(query);

        if (robotDocument != null) {
            return RobotMap.toDomain(robotDocument);
        }
        return null;
    }

    public async findAll(): Promise<Result<Array<Robot>>> {
        try {
            const robotRecord = await this.robotSchema.find();

            const robots = robotRecord.map((item) => {
                return RobotMap.toDomain(item);
            });

            return Result.ok<Array<Robot>>(robots);
        } catch (err) {
            throw err;
        }
    }
}
