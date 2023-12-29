import { Service, Inject } from 'typedi';
import config from "../../config";

import {IDeliveryTaskDTO} from "../dto/IDeliveryTaskDTO";
import {Result} from "../core/logic/Result";
import IDeliveryTaskService from "./IServices/IDeliveryTaskService";
import IRobotRepo from "./IRepos/IRobotRepo";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import axios from 'axios';
import * as https from "https";
import {ITaskDTO} from "../dto/ITaskDTO";





@Service()
export default class DeliveryTaskService implements IDeliveryTaskService{

  constructor(
      @Inject(config.repos.robot.name) private RobotRepo: IRobotRepo,
        @Inject(config.repos.robotType.name) private RobotTypeRepo: IRobotTypeRepo

  ) {}
   

  public async createDeliveryTask(deliveryTaskDTO: IDeliveryTaskDTO): Promise<Result<IDeliveryTaskDTO>> {
    try {

        const agent = new https.Agent({
            rejectUnauthorized: false, // This line makes Axios accept self-signed certificates
        });
        const response = await axios.post('http://localhost:5000/api/DeliveryTasksRequest', {
            Id : "",
            Description : deliveryTaskDTO.description ,
            User : deliveryTaskDTO.user,
            RoomDest : deliveryTaskDTO.roomDest,
            RoomOrig : deliveryTaskDTO.roomOrig,
            State: "",
            DestName: deliveryTaskDTO.destName,
            OrigName:deliveryTaskDTO.origName,
            DestPhoneNumber:deliveryTaskDTO.destPhoneNumber,
            OrigPhoneNumber:deliveryTaskDTO.origPhoneNumber,
            Code:deliveryTaskDTO.code
        }, { httpsAgent: agent });
        return Result.ok<IDeliveryTaskDTO>(response.data);


    } catch (e) {
        throw e;
    }
    }

    public async getAllDeliveryTasks(): Promise<Result<IDeliveryTaskDTO[]>> {
        try {

            const agent = new https.Agent({
                rejectUnauthorized: false
            });



            const response = await axios.get('http://localhost:5000/api/DeliveryTasks', { httpsAgent: agent });
            return Result.ok<IDeliveryTaskDTO[]>(response.data);
        }
        catch (e) {
            throw e;
        }
    }
    public async getAllPendingTasks(): Promise<Result<ITaskDTO[]>> {
      try{
          const agent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios.get('http://localhost:5000/api/DeliveryTasks/Pending', { httpsAgent: agent });

            return Result.ok<ITaskDTO[]>(response.data);

      }
      catch(e){
          throw e;
      }
    }

    public async getAllDeliveryTaskRequests(): Promise<Result<IDeliveryTaskDTO[]>> {
        try{
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios.get('http://localhost:5000/api/DeliveryTasksRequest', { httpsAgent: agent });

            return Result.ok<IDeliveryTaskDTO[]>(response.data);

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

            const response = await axios.get('http://localhost:5000/api/DeliveryTasksRequest/Pending', { httpsAgent: agent });

            return Result.ok<ITaskDTO[]>(response.data);

        }
        catch(e){
            throw e;
        }
    }


    public async approveDeliveryTask(id: string): Promise<Result<IDeliveryTaskDTO>> {
        try {
            const agent = new https.Agent({
                rejectUnauthorized: false
            });



            const robotType = await this.RobotTypeRepo.findAll();

            const deliveryRobot =await  this.RobotRepo.findByType(robotType.find(robotType => robotType.taskTypeCode === 'DELIVERY').code.value);
            const robot =  deliveryRobot.find(robot => robot.enabled === true)
            const response = await axios.post('http://localhost:5000/api/DeliveryTasksRequest/Approve', {
                Id: id,
                RobotId: robot.code.value
            },
            { httpsAgent: agent }
            );

            return Result.ok<IDeliveryTaskDTO>(response.data);


        } catch (e) {
            throw e;
        }

    }

    public async rejectDeliveryTask(id: string): Promise<Result<IDeliveryTaskDTO>> {
        try {
            const agent = new https.Agent({
                rejectUnauthorized: false
            });


            const response = await axios.post('http://localhost:5000/api/DeliveryTasksRequest/Reject', {
                Id: id,
                RobotId: ""
            },
    { httpsAgent: agent }
                );

            return Result.ok<IDeliveryTaskDTO>(response.data);
    }
        catch (e) {
            throw e;
        }
    }


    public async startDeliveryTask(id: string): Promise<Result<IDeliveryTaskDTO>> {
        try {

            const agent = new https.Agent({
                rejectUnauthorized: false
            });


            const response = await axios.post('http://localhost:5000/api/DeliveryTasks/Start', {
                Id: id,
                RobotId: ""
            },
    { httpsAgent: agent }
                );

            return Result.ok<IDeliveryTaskDTO>(response.data);
        }
        catch (e) {
            throw e;
        }
    }

    public async getFilteredDeliveryTask(state: string, user: string): Promise<Result<IDeliveryTaskDTO[]>> {
        try{
            const agent = new https.Agent({
                  rejectUnauthorized: false
              });
  
              const response = await axios.get(`http://localhost:5000/api/DeliveryTasksRequest/filtered?state=${state}&user=${user}`, { httpsAgent: agent });
  
              return Result.ok<IDeliveryTaskDTO[]>(response.data);
  
        }
        catch(e){
            throw e;
        }
    }
}