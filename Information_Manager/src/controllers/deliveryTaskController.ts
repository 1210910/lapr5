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

}