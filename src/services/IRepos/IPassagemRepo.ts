import { Repo } from "../../core/infra/Repo";
import { Passagem } from "../../domain/Passagem";

export default interface IPassagemRepo extends Repo<Passagem> {
  save(passagem: Passagem): Promise<Passagem>;
  findAll(): Promise<Passagem[]>;
  exists(passagem: Passagem): Promise<boolean>;
}
