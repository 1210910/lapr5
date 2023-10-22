import { Service, Inject } from "typedi";
import config from "../../config";
import { Passagem } from "../domain/Passagem";
import { PassagemMap } from "../mappers/PassagemMap";
import IPassagemDTO from "../dto/IPassagemDTO";
import IPassagemService from "./IServices/IPassagemService";
import IPassagemRepo from "./IRepos/IPassagemRepo";
import { Result } from "../core/logic/Result";

// http://localhost:4000/api/passagem

@Service()
export default class PassagemService implements IPassagemService {
    constructor(
        @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo
    ) { }

    public async createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
        try {

            const passagemOrError = await Passagem.create(passagemDTO);

            if (passagemOrError.isFailure) {
                return Result.fail<IPassagemDTO>(passagemOrError.errorValue());
            }

            const passagemResult = passagemOrError.getValue();

            await this.passagemRepo.save(passagemResult);

            const passagemDTOResult = PassagemMap.toDTO(passagemResult) as IPassagemDTO;
            return Result.ok<IPassagemDTO>(passagemDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
        console.log("Not implemented yet");
        return null;
    }
    
    public async listPassagem(): Promise<Result<IPassagemDTO[]>> {
        console.log("Not implemented yet");
        return null;
    }

}
