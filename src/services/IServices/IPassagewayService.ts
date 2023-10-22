import { Result } from "../../core/logic/Result";
import IPassagewayDTO from "../../dto/IPassagewayDTO";

export default interface IPassagewayService  {
    createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>>;
    updatePassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>>;
    listPassageway (): Promise<Result<IPassagewayDTO[]>>;
}