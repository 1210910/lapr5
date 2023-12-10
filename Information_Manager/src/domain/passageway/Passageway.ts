import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { FloorCode } from "../floor/FloorCode";
import { Description } from "../valueObjects/Description";
import { PassageCode } from "./PassageCode";

interface PassagewayProps {
  passageCode: PassageCode;
  floor1: FloorCode;
  floor2: FloorCode;
  description: Description;
}

export class Passageway extends AggregateRoot<PassagewayProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  /*get passagewayId(): PassagewayId {
      return PassagewayId.caller(this.id);
  }*/

  get passageCode(): PassageCode {
    return this.props.passageCode;
  }

  set passageCode(code: PassageCode) {
    this.props.passageCode = code;
  }

  get floor1(): FloorCode {
    return this.props.floor1;
  }

  set floor1(floor: FloorCode) {
    this.props.floor1 = floor;
  }

  get floor2(): FloorCode {
    return this.props.floor2;
  }

  set floor2(floor: FloorCode) {
    this.props.floor2 = floor;
  }

  get description(): Description {
    return this.props.description;
  }

  set description(description: Description) {
    this.props.description = description;
  }

  private constructor(props: PassagewayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PassagewayProps | any, id?: UniqueEntityID): Result<Passageway> {

    const guardedProps = [
      { argument: props.floor1, argumentName: "floor1" },
      { argument: props.floor2, argumentName: "floor2" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passageway>(guardResult.message);
    }

    try {
      const passageway = new Passageway({
        passageCode: props.passageCode ? PassageCode.toDomain(props.passageCode) : PassageCode.valueOf(props.floor1, props.floor2),
        floor1: FloorCode.valueOf(props.floor1),
        floor2: FloorCode.valueOf(props.floor2),
        description: Description.valueOf(props.description)
      }, id);

      return Result.ok<Passageway>(passageway);
    }
    catch (err) {
      return Result.fail<Passageway>(err.message);
    }
  }


  public static update(props: PassagewayProps | any, passageway: Passageway): Result<Passageway> {
    try {
      passageway.floor1 = FloorCode.valueOf(props.floor1) ?? passageway.floor1;
      passageway.floor2 = FloorCode.valueOf(props.floor2) ?? passageway.floor2;
      passageway.passageCode = PassageCode.valueOf(passageway.floor1.value, passageway.floor2.value);
      passageway.description = Description.valueOf(props.description) ?? passageway.description;
      return Result.ok<Passageway>(passageway);
    }
    catch (err) {
      return Result.fail<Passageway>(err.message);
    }
  }

}
