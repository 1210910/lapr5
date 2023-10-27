import { Service, Inject } from "typedi";
import config from "../../config";
import { Robot } from "../domain/robot";
import { RobotMap } from "../mappers/robotMap";
import IRobotDTO from "../dto/IRobotDTO";
import IRobotService from "./IServices/IRobotService";
import IRobotRepo from "./IRepos/IRobotRepo";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import { Result } from "../core/logic/Result";

@Service()
export default class RobotService implements IRobotService {
    constructor(
        @Inject(config.repos.robot.name) private RobotRepo: IRobotRepo,
        @Inject(config.repos.robotType.name) private RobotTypeRepo: IRobotTypeRepo
    ) { }
    
    public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            if (await this.RobotRepo.existsByCode(robotDTO.code)) {
                return Result.fail<IRobotDTO>("Robot already exists");
            }

            if (! await this.RobotTypeRepo.existsByCode(robotDTO.type)) {
                return Result.fail<IRobotDTO>("Robot type doesn't exist");
            }

            const RobotOrError = await Robot.create(robotDTO);
            if (RobotOrError.isFailure) {
                return Result.fail<IRobotDTO>(RobotOrError.errorValue());
            }

            const RobotResult = RobotOrError.getValue();

            await this.RobotRepo.save(RobotResult);

            const RobotDTOResult = RobotMap.toDTO(RobotResult) as IRobotDTO;
            return Result.ok<IRobotDTO>(RobotDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async enableRobot(robotCode: string): Promise<Result<IRobotDTO>> {
        console.log("Not implemented");
        return null;
    }

    public async listRobot(): Promise<Result<Array<IRobotDTO>>> {
        console.log("Not implemented");
        return null;
    }
}