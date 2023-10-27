import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
    createRobot(req: Request, res: Response, next: NextFunction);
    enableRobot(req: Request, res: Response, next: NextFunction);
    listRobot(req: Request, res: Response, next: NextFunction);
}