import { Result } from "../../core/logic/Result";
import { IDeliveryTaskDTO} from "../../dto/IDeliveryTaskDTO";
import {ITaskDTO} from "../../dto/ITaskDTO";
import IFilteredParameters from "../../dto/IFilteredParameters";

export default interface IDeliveryTaskService  {

  createDeliveryTask(deliveryTaskDTO: IDeliveryTaskDTO): Promise<Result<IDeliveryTaskDTO>>;
  getAllDeliveryTasks(): Promise<Result<IDeliveryTaskDTO[]>>;
  approveDeliveryTask(id: string): Promise<Result<IDeliveryTaskDTO>>;
  rejectDeliveryTask(id: string): Promise<Result<IDeliveryTaskDTO>>;
  getAllPendingTaskRequests(): Promise<Result<ITaskDTO[]>>;
  getAllPendingTasks(): Promise<Result<ITaskDTO[]>>;
  getAllDeliveryTaskRequests(): Promise<Result<IDeliveryTaskDTO[]>>;
  getFilteredDeliveryTask(state: string, user:string): Promise<Result<IDeliveryTaskDTO[]>>;

}