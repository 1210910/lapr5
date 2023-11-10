import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import jsonPatch from 'json-patch';
import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import { IBuildingDTO } from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController {

    constructor(
        @Inject(config.services.building.name) private buildingServiceInstance: IBuildingService
    ) { }

    public async createBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(400).json({ error: buildingOrError.errorValue() });
            }

            const buildingDto = buildingOrError.getValue();
            return res.status(201).json(buildingDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getAllBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingsOrError = await this.buildingServiceInstance.getAllBuildings();

            if (buildingsOrError.isFailure) {
                return res.status(404).send();
            }

            const buildingDto = buildingsOrError.getValue();
            return res.status(200).json(buildingDto);

        } catch (e) {
            return next(e);
        }
    };

    public async getBuildingsMinMax(req: Request, res: Response, next: NextFunction) {
        try {

            const buildingsOrError = await this.buildingServiceInstance.getBuildingsMinMax(req.params.min, req.params.max);

            if (buildingsOrError.isFailure) {
                return res.status(404).send();
            }

            const buildingDto = buildingsOrError.getValue();
            return res.status(200).json(buildingDto);

        } catch (e) {
            return next(e);
        }

    }



    public async editBuilding(req: Request, res: Response, next: NextFunction) {
      /*
        const patchDocument = req.body; // Assuming the request body contains the JSON Patch document

        // Check if there's a 'replace' operation targeting the '/code' path
        const replaceOperation = patchDocument.find(op => op.op === 'replace' && op.path === '/code');

        if (replaceOperation) {
            return res.status(400).json({ error: 'Replacing the /code path is not allowed' });
        }
      */
        try {
            const buildingOrError = await this.buildingServiceInstance.editBuilding(req.params.code as string, req.body as IBuildingDTO) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(400).json({ error: buildingOrError.errorValue() });
            }

            const buildingDto = buildingOrError.getValue();
            return res.status(200).json(buildingDto);

        } catch (e) {
            return next(e);
        }
    };

}
