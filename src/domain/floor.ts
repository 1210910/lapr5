import { set } from "lodash";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import IFloorDTO from "../dto/IFloorDTO";
import { Console } from "console";




interface FloorProps {
    floorCode: string;
    floorNumber: number;
    width: number;
    length: number;
    description: string;
    buildingID: string;

}


export class Floor extends AggregateRoot<FloorProps> {
    
    get id (): UniqueEntityID {
        return this._id;
    }

    get floorCode (): string {
        return this.props.floorCode;
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

    get width (): number {
        return this.props.width;
    }
    get length (): number {
        return this.props.length;
    }

    set width (width: number) {
        this.props.width = width;
    }

    set length (length: number) {
        this.props.length = length;
    }

    set floorCode (floorCode: string) {
        if (floorCode.length <= 10 && floorCode != undefined && floorCode != null  && /^[\w\s]+$/.test(floorCode) ) {
            this.props.floorCode = floorCode;
        }
    }
    set description (description: string) {
        if (description.length <= 250 && description != undefined && description != null  && /^[\w\s]+$/.test(description) ) {
            this.props.description = description;
        }
    }

    set buildingID (buildingID: string) {
        if (buildingID != undefined && buildingID != null  && /^[\w\s]+$/.test(buildingID) ) {
            this.props.buildingID = buildingID;
        }
    }

    set floorNumber (floorNumber: number) {
        if (floorNumber != undefined && floorNumber != null  ) {
            this.props.floorNumber = floorNumber;
        }
    }


    private constructor (props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

        const guardedProps = [
            {argument :props.floorCode, argumentName: 'floorCode'},
            {argument :props.floorNumber, argumentName: 'floorNumber'},
            { argument: props.width, argumentName: 'width' },
            { argument: props.length, argumentName: 'length'},
            { argument: props.buildingID, argumentName: 'buildingID' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
           
            return Result.fail<Floor>(guardResult.message)
        }
        if (props.floorCode.length > 10) {
            return Result.fail<Floor>("Floor code cannot be longer than 10 characters");
        }

        if (props.description.length > 250) {
            return Result.fail<Floor>("Description cannot be longer than 250 characters");
        }


         
            const floor = new Floor(props, id); 
           
            return Result.ok<Floor>(floor);
       
    }

    public static edit (props:  IFloorDTO, floor:Floor) :Result<Floor> {

        if (props.floorCode !== floor.floorCode) {
            floor.floorCode= floor.buildingID + props.floorNumber;
        }
        
        floor.floorNumber = floor.floorNumber ?? props.floorNumber;
        floor.width = props.width ?? floor.width;
        floor.length = props.length ?? floor.length;
        floor.description = props.description ?? floor.description;

        return Result.ok<Floor>(floor);
    }
    
}