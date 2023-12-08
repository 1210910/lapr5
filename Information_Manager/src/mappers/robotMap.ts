import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';
import { Robot } from "../domain/robot/robot";
import IRobotDTO from "../dto/IRobotDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RobotMap extends Mapper<Robot> {

    public static toDTO(robot: Robot): IRobotDTO {
        return {
            code: robot.code.value,
            name: robot.name.value,
            type: robot.type.value,
            enabled: robot.enabled,
            description: robot.description.value
        } as IRobotDTO;
    }

    public static async toDomain (raw: any): Promise<Robot> {

        const robotOrError = Robot.create({
          code: raw.code,
          name: raw.name,
          type: raw.type,
          enabled:raw.enabled,
          description: raw.description
        }, new UniqueEntityID(raw.domainId))
    
        robotOrError.isFailure ? console.log(robotOrError.error) : '';
        return robotOrError.isSuccess ? robotOrError.getValue() : null ;
      }

    public static toPersistence(robot: Robot): any {
        return {
            domainId: robot.id.toString(),
            code: robot.code.value,
            name: robot.name.value,
            type: robot.type.value,
            enabled: robot.enabled,
            description: robot.description.value
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
