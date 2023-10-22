import { Piso } from "../domain/Piso";

export interface IPassagemPersistence {
    _id: string;
    passageCode: string;
    piso1: Piso;
    piso2: Piso;
}