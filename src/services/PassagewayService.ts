import { Service, Inject } from "typedi";
import config from "../../config";
import { Passageway } from "../domain/Passageway";
import { PassagewayMap } from "../mappers/PassagewayMap";
import IPassagewayDTO from "../dto/IPassagewayDTO";
import IPassagewayService from "./IServices/IPassagewayService";
import IPassagewayRepo from "./IRepos/IPassagewayRepo";
import { Result } from "../core/logic/Result";


@Service()
export default class PassagewayService implements IPassagewayService {
    constructor(
        @Inject(config.repos.passageway.name) private passagewayRepo: IPassagewayRepo
    ) { }

    public async createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
        try {

            const passagewayOrError = await Passageway.create(passagewayDTO);

            if (passagewayOrError.isFailure) {
                return Result.fail<IPassagewayDTO>(passagewayOrError.errorValue());
            }

            const passagewayResult = passagewayOrError.getValue();

            await this.passagewayRepo.save(passagewayResult);

            const passagewayDTOResult = PassagewayMap.toDTO(passagewayResult) as IPassagewayDTO;
            return Result.ok<IPassagewayDTO>(passagewayDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updatePassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
        console.log("Not implemented yet");
        return null;
    }
    
    public async listPassageway(): Promise<Result<IPassagewayDTO[]>> {
        console.log("Not implemented yet");
        return null;
    }

}
