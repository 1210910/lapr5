import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Name } from "../valueObjects/Name";
import { RobotTypeCode } from "../robotType/RobotTypeCode";
import { Description } from "../valueObjects/Description";
import { RobotCode } from "./RobotCode";

interface robotProps {
    code: RobotCode;
    name: Name;
    type: RobotTypeCode;
    enabled: boolean;
    description: Description;
}

export class Robot extends AggregateRoot<robotProps>{

   /* get id(): UniqueEntityID {
        return this._id;
    }

    get robotId(): RobotId {
        return RobotId.caller(this.id);
    }*/

    get code(): RobotCode {
        return this.props.code;
    }

    get name(): Name {
        return this.props.name;
    }


    get type(): RobotTypeCode {
        return this.props.type;
    }


    get enabled(): boolean {
        return this.props.enabled;
    }


    get description(): Description {
        return this.props.description;
    }

    set description(description: Description) {
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
      ];
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      if (!guardResult.succeeded) {
        return Result.fail<Robot>(guardResult.message)
      }

      try {
        const robot = new Robot({
          code: RobotCode.valueOf(props.code),
          name: Name.valueOf(props.name),
          type: RobotTypeCode.valueOf(props.type),
          enabled: props.enabled,
          description: Description.valueOf(props.description)
        }, id);

        return Result.ok<Robot>(robot);
      }
      catch (err) {
        return Result.fail<Robot>(err.message);
      }
    }
}
