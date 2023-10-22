import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/Building";

export default interface IUserRepo extends Repo<Building> {
	save(building: Building): Promise<Building>;
	findById (id: string): Promise<Building>;
}
  