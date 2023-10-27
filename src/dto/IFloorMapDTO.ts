import IRoomMapDTO from "./IRoomMapDTO";
import IElevatorMapDTO from "./IElevatorMapDTO";


export default interface IFloorMapDTO {
    floorCode: string;
    rooms: IRoomMapDTO[];
    elevator: IElevatorMapDTO;
    map: string[][];
}