import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";
import { FloorCode } from "./FloorCode";
import { FloorNumber } from "./FloorNumber";
import { Measures } from "../valueObjects/Measures";
import { Description } from "../valueObjects/Description";
import { BuildingCode } from "../building/BuldingCode";

interface FloorProps {
  floorCode: FloorCode;
  floorNumber: FloorNumber;
  width: Measures;
  length: Measures;
  description: Description;
  buildingID: BuildingCode;

}

export class Floor extends AggregateRoot<FloorProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get floorCode(): FloorCode {
    return this.props.floorCode;
  }

  get floorNumber(): FloorNumber {
    return this.props.floorNumber;
  }

  get description(): Description {
    return this.props.description;
  }

  get buildingID(): BuildingCode {
    return this.props.buildingID;
  }

  get width(): Measures {
    return this.props.width;
  }

  get length(): Measures {
    return this.props.length;
  }

  set width(width: Measures) {
    this.props.width = width;
  }

  set length(length: Measures) {
    this.props.length = length;
  }

  set floorCode(floorCode: FloorCode) {
    this.props.floorCode = floorCode;
  }

  set description(description: Description) {
    this.props.description = description;
  }

  set floorNumber(floorNumber: FloorNumber) {
    this.props.floorNumber = floorNumber;
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorProps | any, id?: UniqueEntityID): Result<Floor> {

    const guardedProps = [
      { argument: props.floorNumber, argumentName: "floorNumber" },
      { argument: props.width, argumentName: "width" },
      { argument: props.length, argumentName: "length" },
      { argument: props.buildingID, argumentName: "buildingID" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message);
    }

    try {
      const floor = new Floor({
        floorCode: FloorCode.valueOf(props.buildingID + props.floorNumber),
        floorNumber: FloorNumber.valueOf(props.floorNumber),
        width: Measures.valueOf(props.width),
        length: Measures.valueOf(props.length),
        description: Description.valueOf(props.description),
        buildingID: BuildingCode.valueOf(props.buildingID)
      }, id);
      return Result.ok<Floor>(floor);
    } catch (e) {
      return Result.fail<Floor>(e.message);
    }
  }

  public static edit(props: IFloorDTO | any, floor: Floor): Result<Floor> {
    try {
      if (props.floorNumber !== floor.floorNumber.value) {
        floor.floorCode = FloorCode.valueOf(floor.buildingID.value + props.floorNumber) ?? floor.floorCode;
      }
      floor.floorNumber = FloorNumber.valueOf(props.floorNumber) ?? floor.floorNumber;
      floor.width = Measures.valueOf(props.width) ?? floor.width;
      floor.length = Measures.valueOf(props.length) ?? floor.length;
      floor.description = Description.valueOf(props.description) ?? floor.description;

      return Result.ok<Floor>(floor);
    } catch (e) {
      return Result.fail<Floor>(e.message);
    }
  }

}
