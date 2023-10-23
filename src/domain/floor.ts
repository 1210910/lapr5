import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";




interface FloorProps {
    floorNumber: number;
    dimension: number;
    description: string;
    buildingID: string;

}


export class Floor extends AggregateRoot<FloorProps> {
    
    get id (): UniqueEntityID {
        return this._id;
    }

    get floorNumber (): number {
        return this.props.floorNumber;
    }


    get description (): string {
        return this.props.description;
    }

    get buildingID (): string {
        return this.props.buildingID;
    }

    get dimension (): number {
        return this.props.dimension;
    }


    private constructor (props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

        const guardedProps = [
            { argument: props.dimension, argumentName: 'dimension' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.buildingID, argumentName: 'buildingID' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


        if (!guardResult.succeeded) {
            return Result.fail<Floor>(guardResult.message)
        } else {
            const floor = new Floor({
                ...props
            }, id);

            return Result.ok<Floor>(floor);
        }
    }
    
}