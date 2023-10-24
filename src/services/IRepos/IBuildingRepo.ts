import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/Building";
import { Result } from "../../core/logic/Result";

export default interface IUserRepo extends Repo<Building> {
	save(building: Building): Promise<Building>;
	findById (id: string): Promise<Building>;
	findByCode (code: string): Promise<Building>;
	findByMinMaxFloorNumber(min: number, max: number): Promise<Result<Array<Building>>>;

}
  