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

    //get RoomId(): RoomId {
    //    return RoomId.caller(this.id);
    //}

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



    set floor(value: string) {
        if (value!=null && value!="" && value!=undefined ) {
           this.floor = value;
        }
    }

    set description(value: string) {

        if (value!=null && value!="" && value!=undefined && value.length <= 250) {
            this.description = value;
        }

    }

    set width(value: number) {
        if (value!=null && value!=undefined && value > 0) {
            this.width = value;
        }
    }

    set length(value: number) {
        if (value!=null && value!=undefined && value > 0) {
            this.length = value;
        }
    }

    set roomType(value: string) {
        if (value!=null && value!="" && value!=undefined && (value == "classroom" || value == "laboratory" || value == "anphitheater" || value == "office" || value == "other")) {
            this.roomType = value;
        }
    }

    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }


     public static create(roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
        const guardedProps = [
            { argument: roomDTO.roomCode, argumentName: 'roomCode' },
            { argument: roomDTO.floor, argumentName: 'floor' },
            { argument: roomDTO.description, argumentName: 'description' },
            { argument: roomDTO.width, argumentName: 'width' },
            { argument: roomDTO.length, argumentName: 'length' },
            { argument: roomDTO.roomType, argumentName: 'roomType' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message);
        }

        if (roomDTO.roomCode.length > 50) {
            return Result.fail<Room>("Room code must have maximum 50 characters.");
        }

        if (roomDTO.description.length > 250) {
            return Result.fail<Room>("Room description must have maximum 250 characters.");
        }

        if (roomDTO.width <= 0) {
            return Result.fail<Room>("Room width must be greater than 0.");
        }

        if (roomDTO.length <= 0) {
            return Result.fail<Room>("Room length must be greater than 0.");
        }

        if (roomDTO.roomType != "classroom" && roomDTO.roomType != "laboratory" && roomDTO.roomType != "anphitheater" && roomDTO.roomType != "office" && roomDTO.roomType != "other") {
            return Result.fail<Room>("Room type must be classroom, laboratory, anphitheater, office or other.");
        }

        const roomCode = roomDTO.roomCode;
        const floor = roomDTO.floor;
        const description = roomDTO.description;
        const width = roomDTO.width;
        const length = roomDTO.length;
        const roomType = roomDTO.roomType;
        const room = new Room({ roomCode, floor, description, width, length, roomType }, id);

          return Result.ok<Room>(room);
    }

    public static edit(roomDTO: IRoomDTO, room: Room): Result<Room> {

            room.floor = roomDTO.floor ?? room.floor;
            room.description = roomDTO.description ?? room.description;
            room.width = roomDTO.width ?? room.width;
            room.length = roomDTO.length ?? room.length;
            room.roomType = roomDTO.roomType ?? room.roomType;

        return Result.ok<Room>(room);

    }
}

