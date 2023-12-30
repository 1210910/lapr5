import { ITaskRequestDTO } from "./ITaskRequestDTO";

export interface IDeliveryTaskDTO extends ITaskRequestDTO {

    destName : string;
    origName : string;
    destPhoneNumber : string;
    origPhoneNumber : string;
    confirmationCode : string;

}