import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { BuildingId } from "./BuildingId";

interface BuildingProps {
    code: string;
    name: string ;
    description: string;
    maxLength: number,
    maxWidth: number
  }

  export class Building extends AggregateRoot<BuildingProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    // Ver classe userId
   // get buildingId (): BuildingId {
    //  return BuildingId.caller(this.id)
   // }

    get code (): string{
      return this.props.code;
    }

    get name (): string {
        return this.props.name;
      }

    get description(): string{
        return this.props.description;
    }

    get maxLength (): number {
      return this.props.maxLength;
    }

    get maxWidth (): number {
      return this.props.maxWidth;
    }

    set name (name: string) {
      if (name.length <=50 && name.length > 0 && /^[a-zA-Z0-9]+$/.test(name) ){
        this.props.name = name;
      }

    }

    set description (description: string) {
      if (description.length <= 255 && description.length > 0 && /^[a-zA-Z0-9]+$/.test(description)) {
        this.props.description = description;
      }
    }

    set maxLength (maxLength: number) {
      if (maxLength > 0 && maxLength <= Number.MAX_SAFE_INTEGER){
        this.props.maxLength = maxLength;
      }

    }

    set maxWidth (maxWidth: number) {
      if (maxWidth > 0 && maxWidth <= Number.MAX_SAFE_INTEGER){
        this.props.maxWidth = maxWidth;
      }

    }





    private constructor (props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
      }

    public static create (props: BuildingProps | any , id?: UniqueEntityID): Result<Building> {
        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.maxLength, argumentName: 'maxLength' },
            { argument: props.maxWidth, argumentName: 'maxWidth' }
          ];



          const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
          const guardmaxLenght = Guard.inRange(props.maxLength,1,Number.MAX_SAFE_INTEGER, "maxLenght");
          const guardmaxWidth = Guard.inRange(props.maxWidth,1,Number.MAX_SAFE_INTEGER, "maxWidth");

          if(props.name.length > 50 ){
            return Result.fail<Building>("Name property cannot have more than 50 letters")
          }
          
          if(props.description.length > 255 ){
            return Result.fail<Building>("Description property cannot have more than 255 letters")
          }

          if (!guardResult.succeeded) {
            return Result.fail<Building>(guardResult.message)
          }
          if (!guardmaxLenght.succeeded) {
            return Result.fail<Building>(guardmaxLenght.message)
          }
          if (!guardmaxWidth.succeeded) {
            return Result.fail<Building>(guardmaxWidth.message)
          }
          if (props.code.length > 10) {
            return Result.fail<Building>("Building code cannot be longer than 10 characters");
          }

          if (props.name.length > 50) {
            return Result.fail<Building>("Building name cannot be longer than 50 characters");
          }

          if (props.description.length > 255) {
            return Result.fail<Building>("Building description cannot be longer than 255 characters");
          }

            const building = new Building({
              ...props
            }, id);



            return Result.ok<Building>(building);
    }

    public static edit (props: BuildingProps | any , building : Building): Result<Building> {

      building.name = props.name ?? building.name;
      building.description = props.description ?? building.description;
      building.maxLength = props.maxLength ?? building.maxLength;
      building.maxWidth = props.maxWidth ?? building.maxWidth;

      return Result.ok<Building>(building);
    }
  }

