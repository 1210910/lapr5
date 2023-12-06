import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { Floor } from "./floor/floor";
import { PassagewayId } from "./PassagewayId";
import IPassagewayDTO from "../dto/IPassagewayDTO";

interface PassagewayProps {
    passageCode: string;
    floor1: string;
    floor2: string;
    description: string;
}

export class Passageway extends AggregateRoot<PassagewayProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    /*get passagewayId(): PassagewayId {
        return PassagewayId.caller(this.id);
    }*/

    get passageCode(): string {
        return this.props.passageCode;
    }

    set passageCode(code: string) {
      if (code != null && code.length > 1) {
        this.props.passageCode = code;
      }
    }

    get floor1(): string {
        return this.props.floor1;
    }

    set floor1(floor: string) {
      if (floor != null && floor.length > 1)
        this.props.floor1 = floor;
    }

    get floor2(): string {
        return this.props.floor2;
    }

    set floor2(floor: string) {
      if (floor != null && floor.length > 1){
        this.props.floor2 = floor;
      }
    }

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
      if (description != null && description.length > 1 && description.length < 255){
          this.props.description = description;
      }
    }

    private constructor(props: PassagewayProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props:PassagewayProps | any, id?: UniqueEntityID): Result<Passageway> {

      const guardedProps = [
        {argument: props.passageCode, argumentName: "passageCode"},

        {argument: props.floor1, argumentName: "floor1"},
        {argument: props.floor2, argumentName: "floor2"},
        {argument: props.description, argumentName: "description"
        }];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

      if (!guardResult.succeeded) {
        return Result.fail<Passageway>(guardResult.message)
      }
      if(props.description.length > 255 ){
        return Result.fail<Passageway>("Description property cannot have more than 255 letters")

      }

    const passageway = new Passageway({
    ...props
    }, id);
    return Result.ok<Passageway>(passageway);
}


    public static update(props: PassagewayProps | any, passageway : Passageway): Result<Passageway> {
      passageway.passageCode = props.passageCode ?? passageway.passageCode;
      passageway.floor1 = props.floor1 ?? passageway.floor1;
      passageway.floor2 = props.floor2 ?? passageway.floor2;
      passageway.description = props.description ?? passageway.description;

      return Result.ok<Passageway>(passageway);

    }

}
