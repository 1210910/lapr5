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

            const floorMapOrError = await this.floorMapService.createFloorMap(req.body) as Result<IFloorMapDTO>;
            console.log("estou aqui");
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

}
