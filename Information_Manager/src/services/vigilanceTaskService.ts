import { Service, Inject } from 'typedi';
import config from "../../config";

import {IDeliveryTaskDTO} from "../dto/IDeliveryTaskDTO";
import {Result} from "../core/logic/Result";

import IRobotRepo from "./IRepos/IRobotRepo";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import axios from 'axios';
import IVigilanceTaskService from "./IServices/IVigilanceTaskService";
import {IVigilanceTaskDTO} from "../dto/IVigilanceTaskDTO";
import * as https from "https";
import {ITaskDTO} from "../dto/ITaskDTO";





@Service()
export default class VigilanceTaskService implements IVigilanceTaskService{

    constructor(
        @Inject(config.repos.robot.name) private RobotRepo: IRobotRepo,
        @Inject(config.repos.robotType.name) private RobotTypeRepo: IRobotTypeRepo

    ) {}

    public async createVigilanceTask(deliveryTaskDTO: IVigilanceTaskDTO): Promise<Result<IVigilanceTaskDTO>> {
        try {
            const agent = new https.Agent({
                rejectUnauthorized: false
            });


            const response = await axios.post('http://localhost:5000/api/VigilanceTasksRequest', {
                Id : "",
                Description : deliveryTaskDTO.description ,
                User : deliveryTaskDTO.user,
                RoomDest : deliveryTaskDTO.roomDest,
                RoomOrig : deliveryTaskDTO.roomOrig,
                State: "",
                RequestName: deliveryTaskDTO.requestName,
                RequestNumber: deliveryTaskDTO.requestNumber,
            }, { httpsAgent: agent });
            return Result.ok<IVigilanceTaskDTO>(response.data);


        } catch (e) {
            throw e;
        }
    }
    public async getAllPendingTasks(): Promise<Result<ITaskDTO[]>> {
        try{
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios.get('http://localhost:5000/api/VigilanceTasks/Pending', { httpsAgent: agent });

            return Result.ok<ITaskDTO[]>(response.data);

        }
        catch(e){
            throw e;
        }
    }

    public async getAllVigilanceTaskRequests(): Promise<Result<IVigilanceTaskDTO[]>> {
        try{
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios.get('http://localhost:5000/api/VigilanceTasksRequest', { httpsAgent: agent });

            return Result.ok<IVigilanceTaskDTO[]>(response.data);

        }
        catch(e){
            throw e;
        }
    }

    public async getAllPendingTaskRequests(): Promise<Result<ITaskDTO[]>> {
        try{
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios.get('http://localhost:5000/api/VigilanceTasksRequest/Pending', { httpsAgent: agent });

            return Result.ok<ITaskDTO[]>(response.data);

        }
        catch(e){
            throw e;
        }
    }

    public async getAllVigilanceTasks(): Promise<Result<IVigilanceTaskDTO[]>> {
        try {
            const agent = new https.Agent({
                rejectUnauthorized: false
            });


            const response = await axios.get('http://localhost:5000/api/VigilanceTasks', { httpsAgent: agent });
            return Result.ok<IVigilanceTaskDTO[]>(response.data);
        }
        catch (e) {
            throw e;
        }
    }

    public async approveVigilanceTask(id: string): Promise<Result<IVigilanceTaskDTO>> {
        try {

            const agent = new https.Agent({
                rejectUnauthorized: false
            });


            const robotType = await this.RobotTypeRepo.findAll();

            const deliveryRobot =await  this.RobotRepo.findByType(robotType.find(robotType => robotType.taskTypeCode === 'VIGILANCE').code.value);
            const robot =  deliveryRobot.find(robot => robot.enabled === true)
            const response = await axios.post('http://localhost:5000/api/VigilanceTasksRequest/approve', {
                Id: id,
                RobotId: robot.code.value
            }, { httpsAgent: agent });

            return Result.ok<IVigilanceTaskDTO>(response.data);


        } catch (e) {
            throw e;
        }

    }

    public async rejectVigilanceTask(id: string): Promise<Result<IVigilanceTaskDTO>> {
        try {
            const agent = new https.Agent({
                rejectUnauthorized: false
            });



            const response = await axios.post('http://localhost:5000/api/VigilanceTasksRequest/Reject', {
                Id: id,
                RobotId: ""
            }, { httpsAgent: agent });

            return Result.ok<IVigilanceTaskDTO>(response.data);
        }
        catch (e) {
            throw e;
        }
    }


    public async startVigilanceTask(id: string): Promise<Result<IVigilanceTaskDTO>> {


        try {
            const agent = new https.Agent({
                rejectUnauthorized: false
            });
            const response = await axios.post('http://localhost:5000/api/VigilanceTasks/start', {
                Id: id,
                RobotId: ""
            }, { httpsAgent: agent });

            return Result.ok<IVigilanceTaskDTO>(response.data);
        }
        catch (e) {
            throw e;
        }
    }

    public async getFilteredVigilanceTask(state: string, user: string): Promise<Result<IVigilanceTaskDTO[]>> {
        try{
            const agent = new https.Agent({
                  rejectUnauthorized: false
              });
  
              const response = await axios.get(`http://localhost:5000/api/VigilanceTasksRequest/filtered?state=${state}&user=${user}`, { httpsAgent: agent });
  
              return Result.ok<IVigilanceTaskDTO[]>(response.data);
  
        }
        catch(e){
            throw e;
        }
    }
}