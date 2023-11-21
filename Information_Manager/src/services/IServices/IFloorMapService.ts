import { IfAny } from "mongoose";
import {Result} from "../../core/logic/Result";
import IFloorMapDTO from "../../dto/IFloorMapDTO";

export default interface IFloorMapService  {
    createFloorMap(floorCode:string ,file:any): Promise<Result<IFloorMapDTO>>;
    getFloorMap(floorCode:string): Promise<Result<String>>;
}
