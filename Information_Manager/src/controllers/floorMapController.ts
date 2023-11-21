import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorMapController from "./IControllers/IFloorMapController";
import IFloorMapService from '../services/IServices/IFloorMapService';
import IFloorMapDTO from '../dto/IFloorMapDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorMapController implements IFloorMapController {

    constructor(@Inject(config.services.floorMap.name ) private floorMapService : IFloorMapService) {}

    public async createFloorMap(req: Request, res: Response, next: NextFunction) {

        try {
            const floorCode = req.body.floorCode;
            // @ts-ignore
            const file = req.file ;
            const floorMapOrError = await this.floorMapService.createFloorMap(floorCode,file) as Result<IFloorMapDTO>;

            if (floorMapOrError.isFailure) {
                return res.status(400).send(floorMapOrError.errorValue());
            }else{
                const floorMapDTO = floorMapOrError.getValue();
                return res.status(201).json( floorMapDTO );
            }

        }catch (e) {
            return next(e);
        }



    };

    public async getFloorMap(req: Request, res: Response, next: NextFunction) {
        try {
            const floorCode = req.params.floorCode;
            // @ts-ignore

            const floorMapOrError = await this.floorMapService.getFloorMap(floorCode) as Result<String>;

            if (floorMapOrError.isFailure) {
                return res.status(400).send(floorMapOrError.errorValue());
            }else{
                const floorMapDTO = floorMapOrError.getValue();
                return res.status(201).json( floorMapDTO );
            }

        }catch (e) {
            return next(e);
        }
    }

}
