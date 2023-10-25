import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { RoomId } from "./RoomId";
import IRoomDTO from "../dto/IRoomDTO";

interface RoomProps {
    roomCode: string;
    floor: string;
    description: string;
    width : number;
    length : number;
    roomType: string;
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

    get floor(): string {
        return this.props.floor;
    }

    get description(): string {
        return this.props.description;
    }

    get width(): number {
        return this.props.width;
    }

    get length(): number{
        return this.props.length;
    }

    get roomType(): string {
        return this.props.roomType;
    }

    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }


     public static create(roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {         
        const roomCode = roomDTO.roomCode;         
        const floor = roomDTO.floor;               
        const description = roomDTO.description;          
        const width = roomDTO.width;         
        const length = roomDTO.length;
        const roomType = roomDTO.roomType;               
        const room = new Room({ roomCode, floor, description, width, length, roomType }, id);

          return Result.ok<Room>(room);         
    }       
}
  
