import { ITaskRequestDTO } from "./ITaskRequestDTO";

export interface IVigilanceTaskDTO extends ITaskRequestDTO{

    requestName : string;
    requestNumber : string;    

}