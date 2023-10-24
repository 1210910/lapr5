import { set } from "lodash";
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

    set dimension (dimension: number) {
        this.props.dimension = dimension;
    }

    set description (description: string) {
        this.props.description = description;
    }

    set buildingID (buildingID: string) {
        this.props.buildingID = buildingID;
    }

    set floorNumber (floorNumber: number) {
        this.props.floorNumber = floorNumber;
    }


    private constructor (props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

        const guardedProps = [
            {argument :props.floorNumber, argumentName: 'floorNumber'},
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

    public static update (props:  FloorProps):Result<Floor> {
        const guardedProps = [
            {argument :props.floorNumber, argumentName: 'floorNumber'},
            { argument: props.dimension, argumentName: 'dimension' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.buildingID, argumentName: 'buildingID' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Floor>(guardResult.message)
        } else {
            return Result.ok<Floor>(new Floor(props));
        }

    }
    
}