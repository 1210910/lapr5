import { Request, Response, NextFunction } from 'express';

export default interface ITaskRequestController {

    getAllPendingTaskRequests(req: Request, res: Response, next: NextFunction);

    getAllAcceptedTaskRequests(req: Request, res: Response, next: NextFunction);

}