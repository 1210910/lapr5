import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result"
import { RobotId } from "./robotId";
import IRobotDTO from "../dto/IRobotDTO";

interface robotProps {
    code: string;
    name: string;
    type: string;
    enabled: boolean;
    description: string;
}

export class Robot extends AggregateRoot<robotProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    get robotId(): RobotId {
        return RobotId.caller(this.id);
    }

    get code(): string {
        return this.props.code;
    }

    set code(code: string) {
        this.props.code = code;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get type(): string {
        return this.props.type;
    }

    set type(type: string) {
        this.props.type = type;
    }

    get enabled(): boolean {
        return this.props.enabled;
    }

    set enabled(enabled: boolean) {
        this.props.enabled = enabled;
    }

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    private constructor(props: robotProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(iRobotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robot> {
            const code = iRobotDTO.code;
            const name = iRobotDTO.name;
            const type = iRobotDTO.type;
            const enabled = iRobotDTO.enabled;
            const description = iRobotDTO.description;
    
            const robot = new Robot({
                code,
                name,
                type,
                enabled,
                description
            }, id);
    
            return Result.ok<Robot>(robot);
    }
}
