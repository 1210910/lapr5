import { IfAny } from "mongoose";
import {Result} from "../../core/logic/Result";
import IFloorMapDTO from "../../dto/IFloorMapDTO";

export default interface IFloorMapService  {
    createFloorMap(floorMapDTO: IFloorMapDTO): Promise<Result<IFloorMapDTO>>;
}