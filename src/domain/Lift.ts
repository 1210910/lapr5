import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { LiftId } from "./LiftId";
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

    set floors (floors: string[]) {
      this.props.floors = floors;
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

          if (props.code === "" || props.code === undefined || props.code === null) {
            return Result.fail<Lift>("Code is required");
          }

          if(props.code.length > 25 ){
            return Result.fail<Lift>("Code property cannot have more than 25 letters")
          }

          if (props.buildingCode === "" || props.buildingCode === undefined || props.buildingCode === null) {
            return Result.fail<Lift>("Building Code is required");
          }

          if (props.brand === "" || props.brand === undefined || props.brand === null) {
            return Result.fail<Lift>("Floors are required");
          }

          if(props.brand.length > 50 ){
            return Result.fail<Lift>("Brand property cannot have more than 50 letters")
          }

          if(props.model === "" || props.model === undefined || props.model === null){
            return Result.fail<Lift>("Model is required");
          }

          if(props.model.length > 50 ){
            return Result.fail<Lift>("Model property cannot have more than 50 letters")
          }

          if(props.serialNumber === "" || props.serialNumber === undefined || props.serialNumber === null){
            return Result.fail<Lift>("Serial Number is required");
          }

          if(props.serialNumber.length > 50 ){
            return Result.fail<Lift>("Serial Number property cannot have more than 50 letters")
          }

          if(props.description === undefined || props.description === null){
            props.description === "";
          }

          if(props.description.length > 255 ){
            return Result.fail<Lift>("Description property cannot have more than 255 letters")
          }

          if(props.floors === undefined || props.floors === null ){
            return Result.fail<Lift>("Floors are required")
          }

          if(props.floors.length < 1 ){
            return Result.fail<Lift>("Can not create a lift with only 1 floor")
          }

          if (!guardResult.succeeded) {
            return Result.fail<Lift>(guardResult.message)
          }

            const lift = new Lift({
              ...props
            }, id);

            return Result.ok<Lift>(lift);
    }

    public static update(previousLift : Lift , iLiftDTO: ILiftDTO): Result<Lift> {
      previousLift.floors = iLiftDTO.floors ?? previousLift.floors;
      previousLift.brand = iLiftDTO.brand ?? previousLift.brand;
      previousLift.model = iLiftDTO.model ?? previousLift.model;
      previousLift.serialNumber = iLiftDTO.serialNumber ?? previousLift.serialNumber;
      previousLift.description = iLiftDTO.description ?? previousLift.description;
      return Result.ok<Lift>(previousLift);
    }
}

