import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';
import { Robot } from "../domain/robot";
import IRobotDTO from "../dto/IRobotDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RobotMap extends Mapper<Robot> {

    public static toDTO(robot: Robot): IRobotDTO {
        return {
            code: robot.code,
            name: robot.name,
            type: robot.type,
            enabled: robot.enabled,
            description: robot.description
        } as IRobotDTO;
    }

    public static toDomain(robot: any | Model<IRobotPersistence & Document>): Robot {
        const robotOrError = Robot.create(
            robot,
            new UniqueEntityID(robot.domainId)
        );

        robotOrError.isFailure ? console.log(robotOrError.error) : '';

        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }

    public static toPersistence(robot: Robot): any {
        return {
            domainId: robot.id.toString(),
            code: robot.code,
            name: robot.name,
            type: robot.type,
            enabled: robot.enabled,
            description: robot.description
        }
    }

    public static toDTOList(robot: Array<Robot>): Array<IRobotDTO> {
        let robotDTOList: Array<IRobotDTO> = [];
        robot.forEach((robot: Robot) => {
            robotDTOList.push(this.toDTO(robot));
        });

        return robotDTOList;
    }
}