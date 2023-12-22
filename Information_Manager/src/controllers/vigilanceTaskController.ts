import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import IVigilanceTaskController from "./IControllers/IVigilanceTaskController";
import IVigilanceTaskService from "../services/IServices/IVigilanceTaskService";
import {IVigilanceTaskDTO} from "../dto/IVigilanceTaskDTO";



@Service()

export default class VigilanceTaskController implements IVigilanceTaskController {

    constructor(
        @Inject(config.services.deliveryTask.name) private deliveryTaskServiceInstance: IVigilanceTaskService
    ) { }

    public async createVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTaskOrError = await this.deliveryTaskServiceInstance.createVigilanceTask(req.body as IVigilanceTaskDTO);

            if (deliveryTaskOrError.isFailure) {
                return res.status(400).json({ error: deliveryTaskOrError.errorValue() });
            }

            const deliveryTaskDto = deliveryTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllVigilanceTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getAllVigilanceTaskRequests();

            if (deliveryTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = deliveryTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllVigilanceTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getAllVigilanceTasks();

            if (deliveryTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = deliveryTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async approveVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTaskOrError = await this.deliveryTaskServiceInstance.approveVigilanceTask(req.body.id);

            if (deliveryTaskOrError.isFailure) {
                return res.status(400).json({ error: deliveryTaskOrError.errorValue() });
            }

            const deliveryTaskDto = deliveryTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async rejectVigilanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTaskOrError = await this.deliveryTaskServiceInstance.rejectVigilanceTask(req.body.id);

            if (deliveryTaskOrError.isFailure) {
                return res.status(400).json({ error: deliveryTaskOrError.errorValue() });
            }

            const deliveryTaskDto = deliveryTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async getAllPendingTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getAllPendingTaskRequests();

            if (deliveryTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = deliveryTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async getAllPendingTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getAllPendingTasks();

            if (deliveryTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = deliveryTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

}