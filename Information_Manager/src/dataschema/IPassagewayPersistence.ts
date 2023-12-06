import { Floor } from "../domain/floor/floor";

export interface IPassagewayPersistence {
    _id: string;
    passageCode: string;
    floor1: string;
    floor2: string;
    description: string;
}