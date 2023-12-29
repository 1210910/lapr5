import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IDeliveryTaskController from './IControllers/IDeliveryTaskController';
import IDeliveryTaskService from '../services/IServices/IDeliveryTaskService';
import { IDeliveryTaskDTO } from '../dto/IDeliveryTaskDTO';


import { Result } from "../core/logic/Result";

@Service()

export default class DeliveryTaskController implements IDeliveryTaskController {

    constructor(
        @Inject(config.services.deliveryTask.name) private deliveryTaskServiceInstance: IDeliveryTaskService
    ) { }

    public async createDeliveryTask(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTaskOrError = await this.deliveryTaskServiceInstance.createDeliveryTask(req.body as IDeliveryTaskDTO);

            if (deliveryTaskOrError.isFailure) {
                return res.status(400).json({ error: deliveryTaskOrError.errorValue() });
            }

            const deliveryTaskDto = deliveryTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllDeliveryTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getAllDeliveryTasks();

            if (deliveryTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = deliveryTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllDeliveryTaskRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getAllDeliveryTaskRequests();

            if (deliveryTasksOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryTaskDto = deliveryTasksOrError.getValue();
            return res.status(200).json(deliveryTaskDto);

        }
        catch (e) {
            return next(e);
        }
    }

    public async approveDeliveryTask(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTaskOrError = await this.deliveryTaskServiceInstance.approveDeliveryTask(req.body.id);

            if (deliveryTaskOrError.isFailure) {
                return res.status(400).json({ error: deliveryTaskOrError.errorValue() });
            }

            const deliveryTaskDto = deliveryTaskOrError.getValue();
            return res.status(201).json(deliveryTaskDto);

        } catch (e) {
            return next(e);
        }
    }

    public async rejectDeliveryTask(req: Request, res: Response, next: NextFunction) {
        try {
            const deliveryTaskOrError = await this.deliveryTaskServiceInstance.rejectDeliveryTask(req.body.id);

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

    public async getFilteredDeliveryTasks(req: Request, res: Response, next: NextFunction) {
        try {
             
            const state = req.query.state;
            const user = req.query.user;   
    
            const deliveryTasksOrError = await this.deliveryTaskServiceInstance.getFilteredDeliveryTask(state as string,user as string);

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