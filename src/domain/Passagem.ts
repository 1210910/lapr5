import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"
import { Piso } from "./Piso";
import { PassagemId } from "./PassagemId";
import IPassagemDTO from "../dto/IPassagemDTO";

interface PassagemProps {
    passageCode: string;
    piso1: Piso;
    piso2: Piso;
}

export class Passagem extends AggregateRoot<PassagemProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    get passagemId(): PassagemId {
        return PassagemId.caller(this.id);
    }

    get passageCode(): string {
        return this.props.passageCode;
    }

    get piso1(): Piso {
        return this.props.piso1;
    }

    get piso2(): Piso {
        return this.props.piso2;
    }

    private constructor(props: PassagemProps, id?: UniqueEntityID) {
        super(props, id);
    }

    /*
        P: Para criar uma passagem, é necessário introduzir 2 pisos. Como é que os seleciono?
        R: Através do seu ID.

        P: Posso fazer uma listagem e escolher o piso de lá?
        R: Sim, mas é necessário ter o ID do piso.

        P: Como é que eu sei o ID do piso?
        R: Através da listagem de pisos.

        P: Depois da listagem de pisos, como é que eu atribuo á classe Passagem esse piso?
        R: Através do método create.
    */

    public static create(iPassagemDTO: IPassagemDTO, id?: UniqueEntityID): Result<Passagem> {
        
        const passageCode = iPassagemDTO.passageCode;
        const piso1 = iPassagemDTO.piso1;
        const piso2 = iPassagemDTO.piso2;

        const guardResult = Guard.againstNullOrUndefined(passageCode, 'passageCode');
        if (!guardResult.succeeded) {
            return Result.fail<Passagem>(guardResult.message);
        }
        else{
            const passagem = new Passagem({ passageCode, piso1, piso2 }, id);
            return Result.ok<Passagem>(passagem);
        }
    }

}