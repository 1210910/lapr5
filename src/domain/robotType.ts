import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"

interface RobotTypeProps {
    code: string;
    brand: string;
    model: string;
    description: string;
    taskTypeCode: string;
}

export class RobotType extends AggregateRoot<RobotTypeProps> {


    get id (): UniqueEntityID {
        return this._id;
    }

    get code (): string {
        return this.props.code;
    }

    get  brand (): string {
        return this.props.brand;
    }

    get model (): string {
        return this.props.model;
    }

    get description (): string {
        return this.props.description;
    }

    get taskTypeCode (): string {
        return this.props.taskTypeCode;
    }

    private constructor (props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {

        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.brand, argumentName: 'brand' },
            { argument: props.model, argumentName: 'model' },
            { argument: props.taskTypeCode, argumentName: 'taskTypeCode'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (props.code === '' || props.code === undefined || props.code === null) {
            return Result.fail<RobotType>('There is no code.')
        }

        if (props.brand === '' || props.brand === undefined || props.brand === null) {
            return Result.fail<RobotType>('There is no brand.')
        }

        if (props.model === '' || props.model === undefined || props.model === null) {
            return Result.fail<RobotType>('There is no model.')
        }

        if (props.description === undefined || props.description === null) {
            props.description = '';
        }

        if (props.taskTypeCode === '' || props.taskTypeCode === undefined || props.taskTypeCode === null) {
            return Result.fail<RobotType>('There is no task type code.')
        }

        if (props.code.length > 25) {
            return Result.fail<RobotType>("Code must be 25 characters or less");
        }

        if (props.brand.length > 50) {
            return Result.fail<RobotType>("Brand must be 50 characters or less");
        }

        if (props.model.length > 100) {
            return Result.fail<RobotType>("Model must be 100 characters or less");
        }

        if (props.description.length > 250) {
            return Result.fail<RobotType>("Description must be 250 characters or less");
        }

        if (props.taskTypeCode.length > 25) {
            return Result.fail<RobotType>("Task type code must be 25 characters or less");
        }


        if (!guardResult.succeeded) {
            return Result.fail<RobotType>(guardResult.message)
        } else {
            const robotType = new RobotType(
                props
            , id);

            return Result.ok<RobotType>(robotType);
        }
    }
}
