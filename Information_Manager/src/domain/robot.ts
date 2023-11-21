import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result"
import { RobotId } from "./robotId";
import { Guard } from "../core/logic/Guard";

interface robotProps {
    code: string;
    name: string;
    type: string;
    enabled: boolean;
    description: string;
}

export class Robot extends AggregateRoot<robotProps>{

   /* get id(): UniqueEntityID {
        return this._id;
    }

    get robotId(): RobotId {
        return RobotId.caller(this.id);
    }*/

    get code(): string {
        return this.props.code;
    }

    get name(): string {
        return this.props.name;
    }


    get type(): string {
        return this.props.type;
    }



    get enabled(): boolean {
        return this.props.enabled;
    }


    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    private constructor(props: robotProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: robotProps | any , id?: UniqueEntityID): Result<Robot> {
      const guardedProps = [
        { argument: props.code, argumentName: 'code' },
        { argument: props.name, argumentName: 'name' },
        { argument: props.type, argumentName: 'type' },
        { argument: props.enabled, argumentName: 'enabled' },
        { argument: props.description, argumentName: 'description' }
      ];
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      if (!guardResult.succeeded) {
        return Result.fail<Robot>(guardResult.message)
      }
      if(props.name.length > 30 ){
        return Result.fail<Robot>("Name cannot have more than 30 letters")
      }
      if(props.description.length > 250 ){
        return Result.fail<Robot>("Description property cannot have more than 255 letters")
      }


      const robot = new Robot({
        ...props
      }, id);


      return Result.ok<Robot>(robot);
    }
}
