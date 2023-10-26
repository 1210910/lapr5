import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorController implements IFloorController {

    constructor(@Inject(config.services.floor.name) private floorService : IFloorService) {}

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
           // return res.status(201).json( "estou aqui" );
            const pisoOrError = await this.floorService.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

            //return res.status(201).json( "estou aqui" );

            if (pisoOrError.isFailure) {
                return res.status(404).send();
            }
            const pisoDTO = pisoOrError.getValue();
            return res.status(201).json( pisoDTO );
        }
        catch (e) {
            return next(e);
        }
    };

    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const floorDTO = req.body as IFloorDTO;
            floorDTO.floorCode = id;
            const pisoOrError = await this.floorService.updateFloor(floorDTO) as Result<IFloorDTO>;
            if (pisoOrError.isFailure) {
                return res.status(404).send();
            }
            const pisoDTO = pisoOrError.getValue();
            return res.status(201).json( pisoDTO );
        }
        catch (e) {
            return next(e);
        }
    };

    public async listFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const listOrError = await this.floorService.listFloor() as Result<Array<IFloorDTO>>;

            if (listOrError.isFailure) {
                return res.status(404).send();
            }

            const floorDto = listOrError.getValue();
            return res.status(201).json(floorDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getFloorsWithPassageway(req: Request, res: Response, next: NextFunction){
        try {
            const buildingCode = req.params.buildingCode;
            const listOrError = await this.floorService.getFloorsWithPassageway(buildingCode) as Result<Array<IFloorDTO>>;

            if (listOrError.isFailure) {
                return res.status(404).send();
            }

            const floorDto = listOrError.getValue();
            return res.status(201).json(floorDto);

        } catch (e) {
            return next(e);
        }
    }


 
}
