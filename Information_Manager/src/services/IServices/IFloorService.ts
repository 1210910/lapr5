import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService  {
    createFloor(pisoDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    updateFloor(pisoDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    listFloor(buildingCode : string): Promise<Result<Array<IFloorDTO>>>;
    listAllFloor(): Promise<Result<Array<IFloorDTO>>>;
    getFloorsWithPassageway(buildingCode: string): Promise<Result<Array<IFloorDTO>>>;
}
