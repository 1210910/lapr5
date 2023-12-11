import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { RoomId } from "./RoomId";
import IRoomDTO from "../../dto/IRoomDTO";
import { FloorCode } from "../floor/FloorCode";
import { Description } from "../valueObjects/Description";
import { Measures } from "../valueObjects/Measures";
import { RoomCode } from "./RoomCode";

interface RoomProps {
  roomCode: RoomCode;
  floor: FloorCode;
  description: Description;
  width: Measures;
  length: Measures;
  roomType: string;
}

export class Room extends AggregateRoot<RoomProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  //get RoomId(): RoomId {
  //    return RoomId.caller(this.id);
  //}

  get roomCode(): RoomCode {
    return this.props.roomCode;
  }

  get floor(): FloorCode {
    return this.props.floor;
  }

  get description(): Description {
    return this.props.description;
  }

  get width(): Measures {
    return this.props.width;
  }

  get length(): Measures {
    return this.props.length;
  }

  get roomType(): string {
    return this.props.roomType;
  }


  set floor(value: FloorCode) {
    this.floor = value;
  }

  set description(value: Description) {
    this.description = value;
  }

  set width(value: Measures) {
    this.width = value;
  }

  set length(value: Measures) {
    this.length = value;
  }

  set roomType(value: string) {
    this.roomType = value;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create(roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
    const guardedProps = [
      { argument: roomDTO.roomCode, argumentName: "roomCode" },
      { argument: roomDTO.floor, argumentName: "floor" },
      { argument: roomDTO.width, argumentName: "width" },
      { argument: roomDTO.length, argumentName: "length" },
      { argument: roomDTO.roomType, argumentName: "roomType" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Room>(guardResult.message);
    }

    if (roomDTO.roomType != "classroom" && roomDTO.roomType != "laboratory" && roomDTO.roomType != "anphitheater" && roomDTO.roomType != "office" && roomDTO.roomType != "other") {
      return Result.fail<Room>("Room type must be classroom, laboratory, anphitheater, office or other.");
    }

    try {
      const roomCode = RoomCode.valueOf(roomDTO.roomCode);
      const floor = FloorCode.valueOf(roomDTO.floor);
      const description = Description.valueOf(roomDTO.description);
      const width = Measures.valueOf(roomDTO.width);
      const length = Measures.valueOf(roomDTO.length);
      const roomType = roomDTO.roomType;
      const room = new Room({ roomCode, floor, description, width, length, roomType }, id);

      return Result.ok<Room>(room);
    } catch (error) {
      return Result.fail<Room>(error.message);
    }
  }

  public static edit(roomDTO: IRoomDTO, room: Room): Result<Room> {
    try {
      room.floor = FloorCode.valueOf(roomDTO.floor) ?? room.floor;
      room.description = Description.valueOf(roomDTO.description) ?? room.description;
      room.width = Measures.valueOf(roomDTO.width) ?? room.width;
      room.length = Measures.valueOf(roomDTO.length) ?? room.length;
      room.roomType = roomDTO.roomType ?? room.roomType;

      return Result.ok<Room>(room);
    } catch (error) {
      return Result.fail<Room>(error.message);
    }

  }
}

