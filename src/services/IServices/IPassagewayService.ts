import { Result } from "../../core/logic/Result";
import IPassagewayDTO from "../../dto/IPassagewayDTO";

export default interface IPassagewayService  {
    createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>>;
    updatePassageway(passageCode: string, passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>>;
    listPassageway (): Promise<Result<Array<IPassagewayDTO>>>;
}