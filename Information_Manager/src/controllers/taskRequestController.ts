import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITaskRequestController from "./IControllers/ITaskRequestController";
import ITaskRequestService from "../services/IServices/ITaskRequestService";


@Service()
export default class TaskRequestController implements ITaskRequestController {

    constructor(
        @Inject(config.services.taskRequest.name) private taskRequestServiceInstance: ITaskRequestService
    ) { }

   
    public async getAllPendingTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTasksOrError = await this.taskRequestServiceInstance.getAllPendingTaskRequest();


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const taskRequestDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(taskRequestDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllAcceptedTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTasksOrError = await this.taskRequestServiceInstance.getAllAcceptedTaskRequest();


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const taskRequestDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(taskRequestDto);

        } catch (e) {
            return next(e);
        }
    };

   


}