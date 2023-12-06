import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { BuildingId } from "./BuildingId";
import { BuildingCode } from "./BuldingCode";
import { Name } from "../valueObjects/Name";
import { Description } from "../valueObjects/Description";
import { Measures } from "../valueObjects/Measures";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

interface BuildingProps {
  code: BuildingCode;
  name: Name;
  description: Description;
  maxLength: Measures,
  maxWidth: Measures
}

export class Building extends AggregateRoot<BuildingProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  // Ver classe userId
  // get buildingId (): BuildingId {
  //  return BuildingId.caller(this.id)
  // }

  get code(): string {
    return this.props.code.value;
  }

  get name(): Name {
    return this.props.name;
  }

  get description(): Description {
    return this.props.description;
  }

  get maxLength(): Measures {
    return this.props.maxLength;
  }

  get maxWidth(): Measures {
    return this.props.maxWidth;
  }

  set name(name: Name) {
    this.props.name = name;
  }

  set description(description: Description) {
    this.props.description = description;

  }

  set maxLength(maxLength: Measures) {
    this.props.maxLength = maxLength;
  }

  set maxWidth(maxWidth: Measures) {
    this.props.maxWidth = maxWidth;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IBuildingDTO | any, id?: UniqueEntityID): Result<Building> {
    const guardedProps = [
      { argument: props.code, argumentName: "code" },
      { argument: props.name, argumentName: "name" },
      { argument: props.maxLength, argumentName: "maxLength" },
      { argument: props.maxWidth, argumentName: "maxWidth" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message);
    }

    try {
      const building = new Building({
        code: BuildingCode.valueOf(props.code),
        name: Name.valueOf(props.name),
        description: Description.valueOf(props.description),
        maxLength: Measures.valueOf(props.maxLength),
        maxWidth: Measures.valueOf(props.maxWidth)
      }, id);
      return Result.ok<Building>(building);
    } catch (err) {
      return Result.fail<Building>(err.message);
    }
  }

  public static edit(props: IBuildingDTO | any, building: Building): Result<Building> {
    try {
      building.name = Name.valueOf(props.name) ?? building.name;
      building.description = Description.valueOf(props.description) ?? building.description;
      building.maxLength = Measures.valueOf(props.maxLength) ?? building.maxLength;
      building.maxWidth = Measures.valueOf(props.maxWidth) ?? building.maxWidth;

      return Result.ok<Building>(building);
    } catch (err) {
      return Result.fail<Building>(err.message);
    }
  }
}

