import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { Passageway } from "../../domain/Passageway";
import { PassagewayId } from "../../domain/PassagewayId";

export default interface IPassagewayRepo extends Repo<Passageway> {
  save(passageway: Passageway): Promise<Passageway>;
  findAll(): Promise<Result<Array<Passageway>>>;
  exists(passagewayId: PassagewayId | string): Promise<boolean>;
  existsByCode(passageCode: Passageway | string): Promise<boolean>;
  findByCode(passagewayCode: Passageway | string): Promise<Passageway>;
}
