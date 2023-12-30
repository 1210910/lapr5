import { Result } from "../../core/logic/Result";
import {ITaskRequestDTO} from "../../dto/ITaskRequestDTO";

export default interface ITaskRequestService  {


  getAllPendingTaskRequest(): Promise<Result<ITaskRequestDTO[]>>;
  getAllAcceptedTaskRequest(): Promise<Result<ITaskRequestDTO[]>>;

}