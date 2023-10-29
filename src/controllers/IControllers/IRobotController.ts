import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
    createRobot(req: Request, res: Response, next: NextFunction);
    enableDisableRobot(req: Request, res: Response, next: NextFunction);
    listRobot(req: Request, res: Response, next: NextFunction);
}
