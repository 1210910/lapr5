import IRoomMapDTO from "./IRoomMapDTO";
import IElevatorMapDTO from "./IElevatorMapDTO";


export default interface IFloorMapDTO {
    floorCode: string;
    maze: string;
    ground: string;
    wall: string;
    player: string;
}
