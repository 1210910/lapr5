import {Request, Response, NextFunction} from 'express';

export default interface IFloorMapController {
    createFloorMap(req: Request, res: Response, next: NextFunction);
}