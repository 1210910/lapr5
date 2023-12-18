import { Request, Response, NextFunction } from 'express';

export default interface IDeliveryTaskController  {
    createDeliveryTask(req: Request, res: Response, next: NextFunction);
    getAllDeliveryTasks(req: Request, res: Response, next: NextFunction);

}