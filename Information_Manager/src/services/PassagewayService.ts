import { Service, Inject } from "typedi";
import config from "../../config";
import { Passageway } from "../domain/passageway/Passageway";
import { PassagewayMap } from "../mappers/PassagewayMap";
import IPassagewayDTO from "../dto/IPassagewayDTO";
import IPassagewayService from "./IServices/IPassagewayService";
import IPassagewayRepo from "./IRepos/IPassagewayRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import { Result } from "../core/logic/Result";
import { PassageCode } from "../domain/passageway/PassageCode";



@Service()
export default class PassagewayService implements IPassagewayService {
    constructor(
        @Inject(config.repos.passageway.name) private passagewayRepo: IPassagewayRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
    ) { }

    public async createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
        try {
            const potencialCode = PassageCode.valueOf(passagewayDTO.floor1, passagewayDTO.floor2).value;

            if (await this.passagewayRepo.existsByCode(potencialCode)) {
                return Result.fail<IPassagewayDTO>("Passageway already exists");
            }

            if (! await this.floorRepo.existsByFloorCode(passagewayDTO.floor1)) {
                return Result.fail<IPassagewayDTO>("Floor 1 doesn't exist");
            }

            if (! await this.floorRepo.existsByFloorCode(passagewayDTO.floor2)) {
                return Result.fail<IPassagewayDTO>("Floor 2 doesn't exist");
            }

            const floor1 = await this.floorRepo.findByFloorCode(passagewayDTO.floor1);
            const floor2 = await this.floorRepo.findByFloorCode(passagewayDTO.floor2);

            passagewayDTO.passageCode = potencialCode;
            passagewayDTO.floor1 = floor1.id.toString();
            passagewayDTO.floor2 = floor2.id.toString();

            const passagewayOrError = await Passageway.create(passagewayDTO);
            if (passagewayOrError.isFailure) {
                return Result.fail<IPassagewayDTO>(passagewayOrError.errorValue());
            }

            const passagewayResult = passagewayOrError.getValue();

            await this.passagewayRepo.save(passagewayResult);

            const passagewayDTOResult = PassagewayMap.toDTO(passagewayResult) as IPassagewayDTO;
            return Result.ok<IPassagewayDTO>(passagewayDTOResult)
        } catch (e) {
            return Result.fail(e.message);
        }
    }

    public async updatePassageway(passageCode: string, passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
        try {
            const potencialCode = PassageCode.valueOf(passagewayDTO.floor1, passagewayDTO.floor2).value;

            if (!await this.passagewayRepo.existsByCode(passageCode)) {
                return Result.fail<IPassagewayDTO>("Passageway doesn't exists");
            }

            if (await this.passagewayRepo.existsByCode(potencialCode)) {
                return Result.fail<IPassagewayDTO>("Passageway already exists");
            }

            if (passagewayDTO.floor1 != null && !await this.floorRepo.existsByFloorCode(passagewayDTO.floor1)) {
                return Result.fail<IPassagewayDTO>("Floor 1 doesn't exist");
            }

            if (passagewayDTO.floor2 != null && !await this.floorRepo.existsByFloorCode(passagewayDTO.floor2)) {
                return Result.fail<IPassagewayDTO>("Floor 2 doesn't exist");
            }

            const passagewayDocument = await this.passagewayRepo.findByCode(passageCode);

            const floor1 = await this.floorRepo.findByFloorCode(passagewayDTO.floor1);
            const floor2 = await this.floorRepo.findByFloorCode(passagewayDTO.floor2);

            passagewayDTO.floor1 = floor1.id.toString();
            passagewayDTO.floor2 = floor2.id.toString();



            const passagewayOrError = await Passageway.update(passagewayDTO, passagewayDocument);

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

            if (!listOrError) {
                return Result.fail<Array<IPassagewayDTO>>("No passageways found");
            }

            //change all floor ids to floor codes

          for (let i = 0; i < listOrError.length; i++) {
            const floor1 = await this.floorRepo.findByDomainId(listOrError[i].floor1.value);
            const floor2 = await this.floorRepo.findByDomainId(listOrError[i].floor2.value);
            listOrError[i].floor1 = floor1.floorCode;
            listOrError[i].floor2 = floor2.floorCode;
          }


            const passagewayResult = await Promise.all(listOrError);

            const passagewayDTOResult = PassagewayMap.toDTOList(passagewayResult);
            return Result.ok<Array<IPassagewayDTO>>(passagewayDTOResult)
        } catch (e) {
            throw e;
        }

    }

}
