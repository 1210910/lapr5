import { Piso } from "../domain/Piso";

export default interface IPassagemDTO{
    passageCode: string;
    piso1: Piso;
    piso2: Piso;
}