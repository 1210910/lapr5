import {Request, Response, NextFunction} from 'express';

export default interface IFloorMapController {
    createFloorMap(req: Request, res: Response, next: NextFunction);
    getFloorMap(req: Request, res: Response, next: NextFunction);
    getFloorMaps(req:Request,res:Response,next:NextFunction);
}
