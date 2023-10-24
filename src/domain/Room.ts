import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { Floor } from "./floor";
import { RoomId } from "./RoomId";
import { RoomType } from "./RoomType";
import IRoomDTO from "../dto/IRoomDTO";

interface RoomProps {
    roomCode: string;
    floor: Floor;
    description: string;
    width : number;
    length : number;
    roomType: RoomType;
}

export class Room extends AggregateRoot<RoomProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    get RoomId(): RoomId {
        return RoomId.caller(this.id);
    }

    get roomCode(): string {
        return this.props.roomCode;
    }

    get floor(): Floor {
        return this.props.floor;
    }

    get description(): string {
        return this.props.description;
    }

    get width(): number {
        return this.props.width;
    }

    get length(): number{
        return this.props.length
    }

    get roomType(): RoomType {
        return this.props.roomType;
    }

    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(iRoomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {

        const roomCode = iRoomDTO.roomCode;
        const floor = iRoomDTO.floor;
        const description = iRoomDTO.description;
        const width = iRoomDTO.width;
        const length = iRoomDTO.length;
        const roomType = iRoomDTO.roomType;


        const guardResult = Guard.againstNullOrUndefined(roomCode, 'roomCode');
        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message);
        }
        else{
            const room = new Room({ roomCode, floor, description, width, length, roomType }, id);
            return Result.ok<Room>(room);
        }
    }

}
