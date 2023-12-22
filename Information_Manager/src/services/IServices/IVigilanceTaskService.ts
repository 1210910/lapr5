import { Result } from "../../core/logic/Result";

import {IVigilanceTaskDTO} from "../../dto/IVigilanceTaskDTO";
import {ITaskDTO} from "../../dto/ITaskDTO";

export default interface IVigilanceTaskService  {

    createVigilanceTask(deliveryTaskDTO: IVigilanceTaskDTO): Promise<Result<IVigilanceTaskDTO>>;
    getAllVigilanceTasks(): Promise<Result<IVigilanceTaskDTO[]>>;
    approveVigilanceTask(id: string): Promise<Result<IVigilanceTaskDTO>>;
    rejectVigilanceTask(id: string): Promise<Result<IVigilanceTaskDTO>>;
    getAllPendingTasks(): Promise<Result<ITaskDTO[]>>;
    getAllPendingTaskRequests(): Promise<Result<ITaskDTO[]>>;
    getAllVigilanceTaskRequests(): Promise<Result<IVigilanceTaskDTO[]>>;

}