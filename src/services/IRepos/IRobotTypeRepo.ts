import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { RobotType } from "../../domain/robotType";



export default interface IRobotTypeRepo extends Repo<RobotType> {
    exists(robotType: RobotType): Promise<boolean>;
    save(robotType: RobotType): Promise<RobotType>;
}    