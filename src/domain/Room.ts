import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { Floor } from "./floor";
import { RoomId } from "./RoomId";
import IRoomDTO from "../dto/IRoomDTO";

interface RoomProps {
    roomCode: string;
    floor: Floor;
    location: string;
    description: string;
    roomDimensions: RoomDimensions;
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
    
    get location(): string {
        return this.props.location;
    }

    get description(): string {
        return this.props.description;
    }

    get roomDimensions(): RoomDimensions {
        return this.props.roomDimensions;
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
        const location = iRoomDTO.location;
        const description = iRoomDTO.description;
        const roomDimensions = iRoomDTO.roomDimensions;
        const roomType = iRoomDTO.roomType;
        

        const guardResult = Guard.againstNullOrUndefined(roomCode, 'roomCode');
        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message);
        }
        else{
            const Room = new Room({ roomCode, floor, location, description, roomDimensions, roomType }, id);
            return Result.ok<Room>(Room);
        }
    }

}