import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";


interface MazeSizeProps {
    width: number;
    depth: number;
}
interface MazeProps {
    size: MazeSizeProps;
    map: string[][];
    passageways: passagewaysProps[],
    elevators: string[];
    rooms: roomProps[];

}

interface passagewaysProps {
    passagewayCode: string;
    position: string[];
}
interface roomProps {
    roomCode: string;
    position: string[];
}

interface GroundSizeProps {
    width: number;
    height: number;
    depth: number;
}

interface SegmentsProps {
    width: number;
    height: number;
    depth: number;
}

interface AoProps {
  url: string;
  intensity: number;
}

interface DisplacementProps {
  url: string;
  scale: number;
  bias: number;
}

interface ScaleProps {
  x: number;
  y: number;
}

interface NormalProps {
  url: string;
  type:string;
  scale:ScaleProps;
}

interface BumpProps {
  scale: number;
  url: string;
}

interface RoughnessProps {
  url: string;
  rough: number;
}

interface MapProps {
  color: string;
  ao: AoProps;
  displacement: DisplacementProps;
  normal: NormalProps;
  bump: BumpProps;
  roughness: RoughnessProps;
}

interface RepeatProps {
  u: number;
  v: number;
}

interface GroundProps {
  size:GroundSizeProps;
  segments: SegmentsProps;
  color: string;
  maps: MapProps;
  wrapS: number;
  wrapT: number;
  repeat: RepeatProps;
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}


interface WallSegmentsProps {
  width: number;
  height: number;
}

interface WallProps {
  segments: WallSegmentsProps;
  primaryColor: string;
  maps: MapProps;
  wrapS: number;
  wrapT: number;
  repeat: RepeatProps;
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}

interface PlayerProps {
  initialPosition: number[];
  initialRotation: number;
}

interface FloorMapProps {
    floorCode: string;
    maze: MazeProps;
    ground: GroundProps;
    wall: WallProps;
    player: PlayerProps;
}


export class FloorMap extends AggregateRoot<FloorMapProps> {

    get id (): UniqueEntityID {
        return this._id;
    }


    get floorCode (): string {
        return this.props.floorCode;
    }


    get maze (): MazeProps {
        return this.props.maze;
    }

    get ground (): GroundProps {
        return this.props.ground;
    }

    get wall (): WallProps {
        return this.props.wall;
    }

    get player (): PlayerProps {
        return this.props.player;
    }






    private constructor (props: FloorMapProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {

        const guardedProps = [
            { argument: props.floorCode, argumentName: 'floorCode' },
            { argument: props.maze, argumentName: 'maze' },
            { argument: props.ground, argumentName: 'ground' },
            { argument: props.wall, argumentName: 'wall' },
            { argument: props.player, argumentName: 'player' }
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
