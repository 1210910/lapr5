import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { Robot } from "../../domain/robot";
import { RobotId } from "../../domain/robotId";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findAll(): Promise<Result<Array<Robot>>>;
  exists(robotId: RobotId | string): Promise<boolean>;
  existsByCode(robotCode: Robot | string): Promise<boolean>;
  findByCode(robotCode: Robot | string): Promise<Robot>;
}