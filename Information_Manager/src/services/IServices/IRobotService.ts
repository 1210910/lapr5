import { Result } from "../../core/logic/Result";
import IRobotDTO from "../../dto/IRobotDTO";

export default interface IRobotService  {
    createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    enableDisableRobot(robotCode: string, robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    listRobot (): Promise<Result<Array<IRobotDTO>>>;
}
