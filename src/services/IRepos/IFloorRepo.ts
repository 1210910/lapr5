import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";


export default interface IFloorRepo extends Repo<Floor> {
    exists(floor: Floor): Promise<boolean>;
    existsByDomainId(floorId: string): Promise<boolean>;
    save(floor: Floor): Promise<Floor>;
    findByDomainId(floorId: string | number): Promise<Floor>;
    findAll(): Promise<Floor[]>;
    findByBuildingId(buildingId: string): Promise<Floor[]>;
    findByfloorNumberAndBuildingId(floorNumber: number, buildingId: string): Promise<Floor>;
}

