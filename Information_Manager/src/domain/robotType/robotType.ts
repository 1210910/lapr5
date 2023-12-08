import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result"
import { Brand } from "../valueObjects/Brand";
import { Model } from "../valueObjects/Model";
import { Description } from "../valueObjects/Description";
import { RobotTypeCode } from "./RobotTypeCode";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";

interface RobotTypeProps {
    code: RobotTypeCode;
    brand: Brand;
    model: Model;
    description: Description;
    taskTypeCode: string;
}

export class RobotType extends AggregateRoot<RobotTypeProps> {


    get id (): UniqueEntityID {
        return this._id;
    }

    get code (): RobotTypeCode {
        return this.props.code;
    }

    get  brand (): Brand {
        return this.props.brand;
    }

    get model (): Model {
        return this.props.model;
    }

    get description (): Description {
        return this.props.description;
    }

    get taskTypeCode (): string {
        return this.props.taskTypeCode;
    }

    private constructor (props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {

        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.brand, argumentName: 'brand' },
            { argument: props.model, argumentName: 'model' },
            { argument: props.taskTypeCode, argumentName: 'taskTypeCode'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (props.taskTypeCode === '' || props.taskTypeCode === undefined || props.taskTypeCode === null) {
            return Result.fail<RobotType>('There is no task type code.')
        }

        if (props.taskTypeCode.length > 25) {
            return Result.fail<RobotType>("Task type code must be 25 characters or less");
        }

        if (!guardResult.succeeded) {
            return Result.fail<RobotType>(guardResult.message)
        } else {
            try {
                const robotType = new RobotType(
                  {
                      code: RobotTypeCode.valueOf(props.code),
                      brand: Brand.valueOf(props.brand),
                      model: Model.valueOf(props.model),
                      description: Description.valueOf(props.description),
                      taskTypeCode: props.taskTypeCode
                  }
                  , id);

                return Result.ok<RobotType>(robotType);
            } catch (err) {
                return Result.fail<RobotType>(err.message);
            }
        }
    }
}
