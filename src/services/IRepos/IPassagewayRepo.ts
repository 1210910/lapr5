import { Repo } from "../../core/infra/Repo";
import { Passageway } from "../../domain/Passageway";
import { PassagewayId } from "../../domain/PassagewayId";

export default interface IPassagewayRepo extends Repo<Passageway> {
  save(passageway: Passageway): Promise<Passageway>;
  findAll(): Promise<Passageway[]>;
  exists(passagewayId: PassagewayId | string): Promise<boolean>;
  findByCode(passagewayCode: Passageway | string): Promise<Passageway>;
}
