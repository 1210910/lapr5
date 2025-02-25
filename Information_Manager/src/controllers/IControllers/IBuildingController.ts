import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController  {
  createBuilding(req: Request, res: Response, next: NextFunction);
  getAllBuildings(req: Request, res: Response, next: NextFunction);
  getBuildingsMinMax(req: Request, res: Response, next: NextFunction);

  editBuilding(req: Request, res: Response, next: NextFunction);
}
