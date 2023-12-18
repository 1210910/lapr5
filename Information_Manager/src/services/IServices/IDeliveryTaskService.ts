import { Result } from "../../core/logic/Result";
import { IDeliveryTaskDTO} from "../../dto/IDeliveryTaskDTO";

export default interface IDeliveryTaskService  {
  createDeliveryTask(deliveryTaskDTO: IDeliveryTaskDTO): Promise<Result<IDeliveryTaskDTO>>;
  getAllDeliveryTasks(): Promise<Result<IDeliveryTaskDTO[]>>;

}