import { Request, Response, NextFunction } from 'express';

export default interface IDeliveryTaskController {
    createDeliveryTask(req: Request, res: Response, next: NextFunction);

    getAllDeliveryTasks(req: Request, res: Response, next: NextFunction);

    getAllDeliveryTaskRequests(req: Request, res: Response, next: NextFunction);

    approveDeliveryTask(req: Request, res: Response, next: NextFunction);

    rejectDeliveryTask(req: Request, res: Response, next: NextFunction)

    getAllPendingTaskRequests(req: Request, res: Response, next: NextFunction);

    getAllPendingTasks(req: Request, res: Response, next: NextFunction);

    getFilteredDeliveryTasks(req: Request, res: Response, next: NextFunction);

}