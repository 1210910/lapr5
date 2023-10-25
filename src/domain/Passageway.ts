import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { Floor } from "./floor";
import { PassagewayId } from "./PassagewayId";
import IPassagewayDTO from "../dto/IPassagewayDTO";

interface PassagewayProps {
    passageCode: string;
    floor1: string;
    floor2: string;
    description: string;
}

export class Passageway extends AggregateRoot<PassagewayProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    get passagewayId(): PassagewayId {
        return PassagewayId.caller(this.id);
    }

    get passageCode(): string {
        return this.props.passageCode;
    }

    set passageCode(code: string) {
        this.props.passageCode = code;
    }

    get floor1(): string {
        return this.props.floor1;
    }

    set floor1(floor: string) {
        this.props.floor1 = floor;
    }

    get floor2(): string {
        return this.props.floor2;
    }

    set floor2(floor: string) {
        this.props.floor2 = floor;
    }

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    private constructor(props: PassagewayProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(iPassagewayDTO: IPassagewayDTO, id?: UniqueEntityID): Result<Passageway> {
        
        const passageCode = iPassagewayDTO.passageCode;
        const floor1 = iPassagewayDTO.floor1;
        const floor2 = iPassagewayDTO.floor2;
        const description = iPassagewayDTO.description;
        
        const passageway = new Passageway({ passageCode, floor1, floor2, description}, id);
        return Result.ok<Passageway>(passageway);
    }
    

    public static update(previousPassageway: Passageway, iPassagewayDTO: IPassagewayDTO): Result<Passageway> {
            const passageCode = iPassagewayDTO.passageCode;
            const floor1 = iPassagewayDTO.floor1;
            const floor2 = iPassagewayDTO.floor2;
            const description = iPassagewayDTO.description;
    
            previousPassageway.passageCode = passageCode;
            previousPassageway.floor1 = floor1;
            previousPassageway.floor2 = floor2;
            previousPassageway.description = description;
            return Result.ok<Passageway>(previousPassageway);
            
    }

}