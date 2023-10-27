import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";





interface FloorMapProps {

    floorCode: string;
    map: string[][];


}


export class FloorMap extends AggregateRoot<FloorMapProps> {

    get id (): UniqueEntityID {
        return this._id;
    }


    get floorCode (): string {
        return this.props.floorCode;
    }


    get map (): string[][] {

        return this.props.map;
    }


    private constructor (props: FloorMapProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    
        const guardedProps = [
            { argument: props.floorCode, argumentName: 'floorCode' },
            { argument: props.map, argumentName: 'map' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);



        if (!guardResult.succeeded) {
            return Result.fail<FloorMap>(guardResult.message);
        }
        else {
            
            const floorMap = new FloorMap({
                ...props
            }
            , id);

            return Result.ok<FloorMap>(floorMap);
        }
    
    }
}
