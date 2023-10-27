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



    set  brand (brand: string) {
        this.props.brand = brand;
    }

    set model (model: string) {
        this.props.model = model;
    }

    set description (description: string) {
        this.props.description = description;
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