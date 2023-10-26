import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { Floor } from "../../domain/floor";


export default interface IFloorRepo extends Repo<Floor> {
    exists(floor: Floor): Promise<boolean>;
    existsByDomainId(floorId: string): Promise<boolean>;
    existsByFloorCode(code: string): Promise<boolean>;
    save(floor: Floor): Promise<Floor>;
    findByFloorCode(floorId: string | number): Promise<Floor>;
    findByDomainId(floorId: string): Promise<Floor>;
    findAll(): Promise<Result<Array<Floor>>>;
    findByBuildingId(buildingId: string): Promise<Floor[]>;
    findByfloorNumberAndBuildingId(floorNumber: number, buildingId: string): Promise<Floor>;
}

