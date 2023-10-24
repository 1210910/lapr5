import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { BuildingId } from "./BuildingId";

interface BuildingProps {
    code: string;
    name: string;
    description: string;
    maxLength: number,
    maxWidth: number
  }

  export class Building extends AggregateRoot<BuildingProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    // Ver classe userId
    get buildingId (): BuildingId {
      return BuildingId.caller(this.id)
    }

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
    private constructor (props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
      }

    public static create (props: BuildingProps, id?: UniqueEntityID): Result<Building> {
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

          if (!guardResult.succeeded) {
            return Result.fail<Building>(guardResult.message)
          }
          if (!guardmaxLenght.succeeded) {
            return Result.fail<Building>(guardmaxLenght.message)
          }
          if (!guardmaxWidth.succeeded) {
            return Result.fail<Building>(guardmaxWidth.message)
          }

            const building = new Building({
              ...props
            }, id);

            return Result.ok<Building>(building);
    }
  }

