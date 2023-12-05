import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building/Building";
import { Result } from "../../core/logic/Result";

export default interface IBuildingRepo extends Repo<Building> {
	save(building: Building): Promise<Building>;
	findById (id: string): Promise<Building>;
	findAll (): Promise<Building[]>;
	findByCode (id: string): Promise<Building>;
	findByMinMaxFloorNumber(min: number, max: number): Promise<Result<Array<Building>>>;

}
  