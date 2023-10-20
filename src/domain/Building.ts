import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { BuildingId } from "./BuildingId";

interface BuildingProps {
    name: string;
    description: string;
  // indicaçao maxima de piso
  }

  export class Building extends AggregateRoot<BuildingProps> {
   
    get id (): UniqueEntityID {
        return this._id;
    }

    // Ver classe userId 
    get buildingId (): BuildingId {
      return BuildingId.caller(this.id)
    }

    get name (): string {
        return this.props.name;
      }
      
    get description(): string{
        return this.props.description;
    }  
  
    private constructor (props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
      }

    public static create (props: BuildingProps, id?: UniqueEntityID): Result<Building> {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'description' }
          ];

          const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

          if (!guardResult.succeeded) {
            return Result.fail<Building>(guardResult.message)
          }     
          else {
            const building = new Building({
              ...props
            }, id);
      
            return Result.ok<Building>(building);
          }
    }
  }

