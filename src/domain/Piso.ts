import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { Edificio } from "../domain/Edificio";



interface PisoProps {
    numero: number;
    descricao: string;
    edificio: Edificio;

}


export class Piso extends AggregateRoot<PisoProps> {
    
    get id (): UniqueEntityID {
        return this._id;
    }

    get numero (): number {
        return this.props.numero;
    }

    get descricao (): string {
        return this.props.descricao;
    }

    get edificio (): Edificio {
        return this.props.edificio;
    }


    private constructor (props: PisoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: PisoProps, id?: UniqueEntityID): Result<Piso> {

        const guardedProps = [
            { argument: props.numero, argumentName: 'numero' },
            { argument: props.descricao, argumentName: 'descricao' },
            { argument: props.edificio, argumentName: 'edificio' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


        if (!guardResult.succeeded) {
            return Result.fail<Piso>(guardResult.message)
        } else {
            const piso = new Piso({
                ...props
            }, id);

            return Result.ok<Piso>(piso);
        }
    }
    
}