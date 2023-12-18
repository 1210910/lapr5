import { Service, Inject } from 'typedi';
import config from "../../config";

import {IDeliveryTaskDTO} from "../dto/IDeliveryTaskDTO";
import {Result} from "../core/logic/Result";
import IDeliveryTaskService from "./IServices/IDeliveryTaskService";



@Service()
export default class DeliveryTaskService implements IDeliveryTaskService{

  constructor(

  ) {}

  public async createDeliveryTask(deliveryTaskDTO: IDeliveryTaskDTO): Promise<Result<IDeliveryTaskDTO>> {
    try {


        return null;

    } catch (e) {
        throw e;
    }
    }

    public async getAllDeliveryTasks(): Promise<Result<IDeliveryTaskDTO[]>> {
        try {


                return null;
        }
        catch (e) {
            throw e;
        }
    }
}