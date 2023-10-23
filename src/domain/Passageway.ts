import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { Floor } from "./floor";
import { PassagewayId } from "./PassagewayId";
import IPassagewayDTO from "../dto/IPassagewayDTO";

interface PassagewayProps {
    passageCode: string;
    floor1: Floor;
    floor2: Floor;
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

    get floor1(): Floor {
        return this.props.floor1;
    }

    get floor2(): Floor {
        return this.props.floor2;
    }

    get description(): string {
        return this.props.description;
    }

    private constructor(props: PassagewayProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(iPassagewayDTO: IPassagewayDTO, id?: UniqueEntityID): Result<Passageway> {
        
        const passageCode = iPassagewayDTO.passageCode;
        const floor1 = iPassagewayDTO.floor1;
        const floor2 = iPassagewayDTO.floor2;
        const description = iPassagewayDTO.description;

        const guardResult = Guard.againstNullOrUndefined(passageCode, 'passageCode');
        if (!guardResult.succeeded) {
            return Result.fail<Passageway>(guardResult.message);
        }
        else{
            const passageway = new Passageway({ passageCode, floor1, floor2, description}, id);
            return Result.ok<Passageway>(passageway);
        }
    }

}