import { Result } from "../../core/logic/Result";
import { ILiftDTO } from "../../dto/ILiftDTO";

export default interface ILiftService  {
  createLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>>;
  updateLift(liftID : string, liftDTO: ILiftDTO): Promise<Result<ILiftDTO>>;
  //listLift(): Promise<Result<Array<ILiftDTO>>>;
}
