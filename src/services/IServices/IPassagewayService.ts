import { Result } from "../../core/logic/Result";
import IPassagewayDTO from "../../dto/IPassagewayDTO";

export default interface IPassagewayService  {
    createPassageway(passagewayDTO: IPassagewayDTO, floor1: string, floor2: string): Promise<Result<IPassagewayDTO>>;
    updatePassageway(passagewayDTO: IPassagewayDTO, floor1: string, floor2: string): Promise<Result<IPassagewayDTO>>;
    listPassageway (): Promise<Result<Array<IPassagewayDTO>>>;
}