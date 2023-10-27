import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { LiftId } from "./LiftId";
import { Floor } from "./floor";
import { ILiftDTO } from "../dto/ILiftDTO";

interface LiftProps {
    code: string;
    buildingCode: string;
    floors: string[];
    brand: string;
    model: string;
    serialNumber: string,
    description: string;
  }


  export class Lift extends AggregateRoot<LiftProps> {

    get id (): UniqueEntityID {
        return this._id;
    }


    get liftId (): LiftId {
      return LiftId.caller(this.id)
    }

    get code (): string{
      return this.props.code;
    }

    get buildingCode (): string {
        return this.props.buildingCode;
      }

    get floors(): string[]{
        return this.props.floors;
    }

    get brand (): string {
      return this.props.brand;
    }

    get model (): string {
      return this.props.model;
    }

    get serialNumber (): string {
      return this.props.serialNumber;
    }

    get description (): string {
      return this.props.description;
    }

    set description (description: string) { 
      this.props.description = description;
    }

    set brand (brand: string) { 
      this.props.brand = brand;
    }

    set model (model: string) { 
      this.props.model = model;
    }

    set serialNumber (serialNumber: string) { 
      this.props.serialNumber = serialNumber;
    }
  
    private constructor (props: LiftProps, id?: UniqueEntityID) {
        super(props, id);
      }

    public static create (props: LiftProps, id?: UniqueEntityID): Result<Lift> {
        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.buildingCode, argumentName: 'buildingCode' },
            { argument: props.floors, argumentName: 'floors' },
            { argument: props.brand, argumentName: 'brand' },
            { argument: props.model, argumentName: 'model' },
            { argument: props.serialNumber, argumentName: 'serialNumber' },
            { argument: props.description, argumentName: 'description' },
          ];


          const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


          if (!guardResult.succeeded) {
            return Result.fail<Lift>(guardResult.message)
          }

            const lift = new Lift({
              ...props
            }, id);

            return Result.ok<Lift>(lift);
    }

    public static update(previousLift : Lift , iLiftDTO: ILiftDTO): Result<Lift> {
      previousLift.brand = iLiftDTO.brand ?? previousLift.brand;
      previousLift.model = iLiftDTO.model ?? previousLift.model;
      previousLift.serialNumber = iLiftDTO.serialNumber ?? previousLift.serialNumber;
      previousLift.description = iLiftDTO.description ?? previousLift.description;
      return Result.ok<Lift>(previousLift);
}
  }

