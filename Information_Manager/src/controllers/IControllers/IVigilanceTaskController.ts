import { Request, Response, NextFunction } from 'express';

export default interface IVigilanceTaskController {
    createVigilanceTask(req: Request, res: Response, next: NextFunction);

    getAllVigilanceTasks(req: Request, res: Response, next: NextFunction);

    getAllVigilanceTaskRequests(req: Request, res: Response, next: NextFunction);

    approveVigilanceTask(req: Request, res: Response, next: NextFunction);

    rejectVigilanceTask(req: Request, res: Response, next: NextFunction)

    getAllPendingTasks(req: Request, res: Response, next: NextFunction);

    getAllPendingTaskRequests(req: Request, res: Response, next: NextFunction);
}