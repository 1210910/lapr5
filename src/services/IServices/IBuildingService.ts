import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getAllBuildings();

  editBuilding(code: string , buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
}
