import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";


export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByDomainId(floorId: string | number): Promise<Floor>;
    findAll(): Promise<Floor[]>;
    findByName(floorName: string): Promise<Floor>;
    findByBuildingId(buildingId: string): Promise<Floor[]>;
}

