import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import IVigilanceTaskController from "./IControllers/IVigilanceTaskController";
import IVigilanceTaskService from "../services/IServices/IVigilanceTaskService";
import {IVigilanceTaskDTO} from "../dto/IVigilanceTaskDTO";



@Service()

export default class VigilanceTaskController implements IVigilanceTaskController {

    constructor(
        @Inject(config.services.vigilanceTask.name) private vigilanceTaskServiceInstance: IVigilanceTaskService
    ) { }

    public async createVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTaskOrError = await this.vigilanceTaskServiceInstance.createVigilanceTask(req.body as IVigilanceTaskDTO);


            if (vigilanceTaskOrError.isFailure) {
                return res.status(400).json({ error: vigilanceTaskOrError.errorValue() });
            }

            const deliveryTaskDto = vigilanceTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async startVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTaskOrError = await this.vigilanceTaskServiceInstance.startVigilanceTask(req.body.id);

            if (vigilanceTaskOrError.isFailure) {
                return res.status(400).json({ error: vigilanceTaskOrError.errorValue() });
            }

            const deliveryTaskDto = vigilanceTaskOrError.getValue();

            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);

        }
    }




    public async getAllVigilanceTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTasksOrError = await this.vigilanceTaskServiceInstance.getAllVigilanceTaskRequests();


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllVigilanceTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTasksOrError = await this.vigilanceTaskServiceInstance.getAllVigilanceTasks();


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async approveVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTaskOrError = await this.vigilanceTaskServiceInstance.approveVigilanceTask(req.body.id);


            if (vigilanceTaskOrError.isFailure) {
                return res.status(400).json({ error: vigilanceTaskOrError.errorValue() });
            }

            const deliveryTaskDto = vigilanceTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async rejectVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTaskOrError = await this.vigilanceTaskServiceInstance.rejectVigilanceTask(req.body.id);


            if (vigilanceTaskOrError.isFailure) {
                return res.status(400).json({ error: vigilanceTaskOrError.errorValue() });
            }

            const deliveryTaskDto = vigilanceTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async getAllPendingTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTasksOrError = await this.vigilanceTaskServiceInstance.getAllPendingTaskRequests();


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async getAllPendingTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const vigilanceTasksOrError = await this.vigilanceTaskServiceInstance.getAllPendingTasks();


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async getFilteredVigilanceTasks(req: Request, res: Response, next: NextFunction) {
        try {
             
            const state = req.query.state;
            const user = req.query.user;   
    
            const vigilanceTasksOrError = await this.vigilanceTaskServiceInstance.getFilteredVigilanceTask(state as string,user as string);


            if (vigilanceTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = vigilanceTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

}