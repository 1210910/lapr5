import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPassagewayController from './IControllers/IPassagewayController';
import IPassagewayService from '../services/IServices/IPassagewayService';
import IPassagewayDTO from '../dto/IPassagewayDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PassagewayController implements IPassagewayController {

    constructor(
        @Inject(config.services.passageway.name) private passagewayServiceInstance: IPassagewayService
    ) { }

    public async createPassageway(req: Request, res: Response, next: NextFunction) {
        try {
            const passagewayOrError = await this.passagewayServiceInstance.createPassageway(req.body as IPassagewayDTO) as Result<IPassagewayDTO>;

            if (passagewayOrError.isFailure) {
                return res.status(402).send();
            }

            const passagewayDto = passagewayOrError.getValue();
            return res.json(passagewayDto).status(201);

        } catch (e) {
            return next(e);
        }
    };

    public async updatePassageway(req: Request, res: Response, next: NextFunction) {
        try {
            const passageCode = req.params.passageCode;
            const passagewayOrError = await this.passagewayServiceInstance.updatePassageway(passageCode, req.body as IPassagewayDTO) as Result<IPassagewayDTO>;

            if (passagewayOrError.isFailure) {
                return res.status(402).send();
            }

            const passagewayDto = passagewayOrError.getValue();
            return res.json(passagewayDto).status(201);

        } catch (e) {
            return next(e);
        }
    };

    public async listPassageway(req: Request, res: Response, next: NextFunction) {
        try {
            const listOrError = await this.passagewayServiceInstance.listPassageway() as Result<Array<IPassagewayDTO>>;

            if (listOrError.isFailure) {
                return res.status(402).send();
            }

            const passagewayDto = listOrError.getValue();
            return res.json(passagewayDto).status(201);

        } catch (e) {
            return next(e);
        }
    };
}