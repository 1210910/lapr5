import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { ILiftDTO } from "../../dto/ILiftDTO";
import { LiftCode } from "./LiftCode";
import { BuildingCode } from "../building/BuldingCode";
import { FloorCode } from "../floor/FloorCode";
import { Brand } from "../valueObjects/Brand";
import { Model } from "../valueObjects/Model";
import { Description } from "../valueObjects/Description";
import { SerialNumber } from "../valueObjects/SerialNumber";
import { floor } from "lodash";

interface LiftProps {
  code: LiftCode;
  buildingCode: BuildingCode;
  floors: FloorCode[];
  brand: Brand;
  model: Model;
  serialNumber: SerialNumber,
  description: Description;
}


export class Lift extends AggregateRoot<LiftProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): LiftCode {
    return this.props.code;
  }

  get buildingCode(): BuildingCode {
    return this.props.buildingCode;
  }

  get floors(): FloorCode[] {
    return this.props.floors;
  }

  get brand(): Brand {
    return this.props.brand;
  }

  get model(): Model {
    return this.props.model;
  }

  get serialNumber(): SerialNumber {
    return this.props.serialNumber;
  }

  get description(): Description {
    return this.props.description;
  }

  set description(description: Description) {
    this.props.description = description;
  }

  set brand(brand: Brand) {
    this.props.brand = brand;
  }

  set model(model: Model) {
    this.props.model = model;
  }

  set serialNumber(serialNumber: SerialNumber) {
    this.props.serialNumber = serialNumber;
  }

  set floors(floors: FloorCode[]) {
    this.props.floors = floors;
  }

  private constructor(props: LiftProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ILiftDTO, id?: UniqueEntityID): Result<Lift> {
    const guardedProps = [
      { argument: props.buildingCode, argumentName: "buildingCode" },
      { argument: props.floors, argumentName: "floors" },
      { argument: props.brand, argumentName: "brand" },
      { argument: props.model, argumentName: "model" },
      { argument: props.serialNumber, argumentName: "serialNumber" }
    ];


    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Lift>(guardResult.message);
    }

    if (props.floors.length <= 1) {
      return Result.fail<Lift>("Can not create a lift with only 1 floor");
    }

    try {
      const lift = new Lift({
        code: LiftCode.valueOf("L" + props.buildingCode),
        buildingCode: BuildingCode.valueOf(props.buildingCode),
        floors: props.floors.map(floor => FloorCode.valueOf(floor)),
        brand: Brand.valueOf(props.brand),
        model: Model.valueOf(props.model),
        serialNumber: SerialNumber.valueOf(props.serialNumber),
        description: Description.valueOf(props.description)
      }, id);

      return Result.ok<Lift>(lift);
    } catch (error) {
      return Result.fail<Lift>(error.message);
    }
  }

  public static update(previousLift: Lift, iLiftDTO: ILiftDTO): Result<Lift> {
    try {
      previousLift.floors = iLiftDTO.floors.map(floor => FloorCode.valueOf(floor)) ?? previousLift.floors;
      previousLift.brand = Brand.valueOf(iLiftDTO.brand) ?? previousLift.brand;
      previousLift.model = Model.valueOf(iLiftDTO.model) ?? previousLift.model;
      previousLift.serialNumber = SerialNumber.valueOf(iLiftDTO.serialNumber) ?? previousLift.serialNumber;
      previousLift.description = Description.valueOf(iLiftDTO.description) ?? previousLift.description;

      return Result.ok<Lift>(previousLift);
    } catch (error) {
      return Result.fail<Lift>(error.message);
    }
  }
}

