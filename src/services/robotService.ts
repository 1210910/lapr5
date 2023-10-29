import { Service, Inject } from "typedi";
import config from "../../config";
import { Robot } from "../domain/robot";
import { RobotMap } from "../mappers/robotMap";
import IRobotDTO from "../dto/IRobotDTO";
import IRobotService from "./IServices/IRobotService";
import IRobotRepo from "./IRepos/IRobotRepo";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import { Result } from "../core/logic/Result";
import jsonPatch from 'json-patch';


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

    public async enableDisableRobot(robotCode: string, patchedRobot:IRobotDTO): Promise<Result<IRobotDTO>> {

        const robotDocument = await this.RobotRepo.findByCode(robotCode);

        const found = !!robotDocument;
        if (!found) {
          return Result.fail<IRobotDTO>("Can not find robot with code = " + robotCode);
        }
        const updatedRobotData = jsonPatch.apply(robotDocument.props, patchedRobot);

        const robotOrError = await Robot.create({
          code: updatedRobotData.code,
          name: updatedRobotData.name,
          type: updatedRobotData.type,
          enabled: updatedRobotData.enabled,
          description: updatedRobotData.description,
        },updatedRobotData.robotId);

        if(robotOrError.isFailure){
            return Result.fail<IRobotDTO>(robotOrError.errorValue());
        }

        const finalRobot = await this.RobotRepo.save(robotOrError.getValue());

        if (finalRobot == null){
          return Result.fail<IRobotDTO>(finalRobot);
        }
        const robotDTOResult = RobotMap.toDTO( finalRobot ) as IRobotDTO;

        return Result.ok<IRobotDTO>( robotDTOResult )
    }

    public async listRobot(): Promise<Result<Array<IRobotDTO>>> {
        try {
            const robotOrError = await this.RobotRepo.findAll();
            if (robotOrError.isFailure) {
                return Result.fail<Array<IRobotDTO>>(robotOrError.errorValue());
            }

            const robotResult = robotOrError.getValue();

            const robotDTOList = RobotMap.toDTOList(robotResult) as Array<IRobotDTO>;
            return Result.ok<Array<IRobotDTO>>(robotDTOList)
        } catch (e) {
            throw e;
        }
    }
}
