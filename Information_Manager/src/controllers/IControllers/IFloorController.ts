import {Request, Response, NextFunction} from 'express';

export default interface IFloorController {
  createFloor(req: Request, res: Response, next: NextFunction);
  updateFloor(req: Request, res: Response, next: NextFunction);
  listFloor(req: Request, res: Response, next: NextFunction);
  listAllFloor(req: Request, res: Response, next: NextFunction);
  // getFloorsWithPassageway(req: Request, res: Response, next: NextFunction);
}
