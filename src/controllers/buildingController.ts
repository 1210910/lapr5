import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import {IBuildingDTO} from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController {

    constructor(
        @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
    ) {}

        public async createBuilding(req: Request, res: Response, next: NextFunction){
            try{
                const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

                if(buildingOrError.isFailure) {
                    return res.status(409).send(buildingOrError.errorValue());
                }

                const buildingDto = buildingOrError.getValue();
                return res.json(buildingDto).status(201);

            }catch (e){
                return next(e);
            }
        };

        public async getAllBuildings(req: Request, res: Response, next: NextFunction){
            try{
                const buildingsOrError = await this.buildingServiceInstance.getAllBuildings();

                if(buildingsOrError.isFailure) {
                    return res.status(500).send();
                }

                const buildingDto = buildingsOrError.getValue();
                return res.status(200).json(buildingDto);

            }catch (e){
                return next(e);
            }
        };

        public async getBuildingsMinMax(req: Request, res: Response, next: NextFunction){
            try {
                const buildingsOrError = await this.buildingServiceInstance.getBuildingsMinMax(req.params.min, req.params.max);

                if(buildingsOrError.isFailure) {
                    return res.status(500).send();
                }

                const buildingDto = buildingsOrError.getValue();
                return res.status(200).json(buildingDto);

            }catch (e){
                return next(e);
            }

        }

}
