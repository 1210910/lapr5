import { Service, Inject } from "typedi";
import config from "../../config";
import { Passageway } from "../domain/Passageway";
import { PassagewayMap } from "../mappers/PassagewayMap";
import IPassagewayDTO from "../dto/IPassagewayDTO";
import IPassagewayService from "./IServices/IPassagewayService";
import IPassagewayRepo from "./IRepos/IPassagewayRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import { Result } from "../core/logic/Result";



@Service()
export default class PassagewayService implements IPassagewayService {
    constructor(
        @Inject(config.repos.passageway.name) private passagewayRepo: IPassagewayRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo 
    ) { }

    public async createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
        try {
            if(await this.passagewayRepo.existsByCode(passagewayDTO.passageCode)){
                return Result.fail<IPassagewayDTO>("Passageway already exists");
            }

            /* Criar existsByFloorId

            if(await this.floorRepo.existsByFloorId(passagewayDTO.floor1) || await this.floorRepo.existsByFloorId(passagewayDTO.floor2)){
                return Result.fail<IPassagewayDTO>("Floor don't exist");
            }

            */

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

    public async updatePassageway(passageCode: string, passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
        try {
            if(!!await this.passagewayRepo.existsByCode(passageCode)){
                return Result.fail<IPassagewayDTO>("Passageway doesn't exists");
            }
            
            /* Criar existsByFloorId

            if(await this.floorRepo.existsByFloorId(passagewayDTO.floor1) || await this.floorRepo.existsByFloorId(passagewayDTO.floor2)){
                return Result.fail<IPassagewayDTO>("Floor don't exist");
            }
            
            */

            const previousPassageway = await this.passagewayRepo.findByCode(passagewayDTO.passageCode);
            
            const passagewayOrError = await Passageway.update(previousPassageway, passagewayDTO);

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
    
    public async listPassageway(): Promise<Result<Array<IPassagewayDTO>>> {
        try {
            const listOrError = await this.passagewayRepo.findAll();

            if (listOrError.isFailure) {
                return Result.fail<Array<IPassagewayDTO>>(listOrError.errorValue());
            }

            const passagewayResult = listOrError.getValue();

            const passagewayDTOResult = PassagewayMap.toDTOList(passagewayResult) as Array<IPassagewayDTO>;
            return Result.ok<Array<IPassagewayDTO>>(passagewayDTOResult)
        } catch (e) {
            throw e;
        }

    }

}
