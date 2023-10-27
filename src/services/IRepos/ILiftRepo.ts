import { Repo } from "../../core/infra/Repo";
import { Lift } from "../../domain/Lift";
import { Result } from "../../core/logic/Result";

export default interface ILiftRepo extends Repo<Lift> {
	save(lift: Lift): Promise<Lift>;
	findByCode(id: string): Promise<Lift>;
	//findIfBuildingAlreadyHasLift(buildingCode: string): Promise<Boolean>;
	findAll(): Promise<Result<Array<Lift>>>;
	findByBuildingCode(buildingCode: string): Promise<Result<Array<Lift>>>;
}
