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
            { argument: props.description, argumentName: 'description' },
            { argument: props.taskTypeCode, argumentName: 'taskTypeCode'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

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