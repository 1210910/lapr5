import {FloorMap} from "../../domain/floorMap";
import {Result} from "../../core/logic/Result";

export default interface IFloorMapRepo  {
    save(floorMap: any): Promise<any>;
    findByFloorCode(floorCode: string): Promise<Result<FloorMap>>;

}
