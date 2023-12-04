import { Service, Inject } from "typedi";
import config from "../../config";
import { RobotType } from "../domain/robotType/robotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import IRobotTypeService from "./IServices/IRobotTypeService";
import { Result } from "../core/logic/Result";
import { RobotTypeMap } from "../mappers/robotTypeMap";


@Service()
export default class RoboTypeService implements IRobotTypeService{
    constructor(
        @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo
    ) {
    }

    public async createRobotType( robotDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {

        try {
            const robotTypeExists = await this.robotTypeRepo.existsByCode(robotDTO.code);
            if (robotTypeExists) {
                return Result.fail<IRobotTypeDTO>('RobotType already exists')
            }

            const robotTypeOrError = RobotType.create(robotDTO);

            if (robotTypeOrError.isFailure) {
                return Result.fail<IRobotTypeDTO>(robotTypeOrError.error.toString())
            }

            const robotTypeResult = robotTypeOrError.getValue();
            const robotType = await this.robotTypeRepo.save(robotTypeResult);

            const robotTypeDTO = RobotTypeMap.toDTO(robotType);
            return Result.ok<IRobotTypeDTO>(robotTypeDTO);

        } catch (err) {
            return Result.fail<IRobotTypeDTO>('An error has occurred')
        }
    }
}
