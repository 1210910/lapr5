import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { Robot } from "../../domain/robot/robot";
import { RobotId } from "../../domain/robot/robotId";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findAll(): Promise<Array<Robot>>;
  exists(robotId: RobotId | string): Promise<boolean>;
  existsByCode(robotCode: Robot | string): Promise<boolean>;
  findByCode(robotCode: Robot | string): Promise<Robot>;
}
