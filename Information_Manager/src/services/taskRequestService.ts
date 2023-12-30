import { Service, Inject } from 'typedi';
import config from "../../config";

import {Result} from "../core/logic/Result";
import ITaskRequestService from "./IServices/ITaskRequestService";
import axios from 'axios';
import * as https from "https";
import {ITaskDTO} from "../dto/ITaskDTO";
import { ITaskRequestDTO } from '../dto/ITaskRequestDTO';





@Service()
export default class TaskRequestService implements ITaskRequestService{

  constructor(
  ) {}
   
  public async getAllPendingTaskRequest(): Promise<Result<ITaskRequestDTO[]>> {
    try {

        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const response = await axios.get('http://localhost:5000/api/TasksRequest/Pending', { httpsAgent: agent });
        console.log(response.data);
        return Result.ok<ITaskRequestDTO[]>(response.data);
    }
    catch (e) {
        throw e;
    }
}
 

    public async getAllAcceptedTaskRequest(): Promise<Result<ITaskRequestDTO[]>> {
        try {

            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios.get('http://localhost:5000/api/TasksRequest/Accepted', { httpsAgent: agent });
            return Result.ok<ITaskRequestDTO[]>(response.data);
        }
        catch (e) {
            throw e;
        }
    }
   
}