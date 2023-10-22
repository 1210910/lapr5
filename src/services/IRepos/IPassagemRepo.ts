import { Repo } from "../../core/infra/Repo";
import { Passagem } from "../../domain/Passagem";
import { PassagemId } from "../../domain/PassagemId";

export default interface IPassagemRepo extends Repo<Passagem> {
  save(passagem: Passagem): Promise<Passagem>;
  findAll(): Promise<Passagem[]>;
  exists(passagemId: PassagemId | string): Promise<boolean>;
  findByCode(passagemCode: Passagem | string): Promise<Passagem>;
}
