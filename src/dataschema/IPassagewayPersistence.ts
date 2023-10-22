import { Floor } from "../domain/floor";

export interface IPassagewayPersistence {
    _id: string;
    passageCode: string;
    floor1: Floor;
    floor2: Floor;
}