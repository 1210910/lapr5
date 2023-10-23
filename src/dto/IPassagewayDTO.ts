import { Floor } from "../domain/floor";

export default interface IPassagewayDTO{
    passageCode: string;
    floor1: Floor;
    floor2: Floor;
    description: string;
}