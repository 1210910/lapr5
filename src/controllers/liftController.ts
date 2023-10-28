import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import ILiftController from './IControllers/ILiftController';
import ILiftService from '../services/IServices/ILiftService';
import {ILiftDTO} from '../dto/ILiftDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class LiftController implements ILiftController {

    constructor(
        @Inject(config.services.lift.name) private liftServiceInstance : ILiftService
    ) {}


    public async createLift(req: Request, res: Response, next: NextFunction){
        try{
            const liftOrError = await this.liftServiceInstance.createLift(req.body as ILiftDTO) as Result<ILiftDTO>;

            if(liftOrError.isFailure) {
                return res.status(400).json({ error: liftOrError.errorValue() });
            }

            const liftDTO = liftOrError.getValue();
            return res.status(201).json(liftDTO);

        }catch (e){
            return next(e);
        }
    };

    public async updateLift(req: Request, res: Response, next: NextFunction){
        try{
            const id = req.params.id;
            let liftDTO = req.body as ILiftDTO;
            const liftOrError = await this.liftServiceInstance.updateLift(id, req.body as ILiftDTO) as Result<ILiftDTO>;
            if(liftOrError.isFailure) {
                return res.status(404).send(liftOrError.errorValue());
            }

            liftDTO = liftOrError.getValue();
            return res.status(201).json(liftDTO);

        }catch (e){
            return next(e);
        }
    }

    public async listLift(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingCode = req.params.buildingCode;
            const listOrError = await this.liftServiceInstance.listLift(buildingCode) as Result<Array<ILiftDTO>>;

            if (listOrError.isFailure) {
                return res.status(402).send(listOrError.errorValue());
            }

            const liftDto = listOrError.getValue();
            return res.status(201).json(liftDto);

        } catch (e) {
            return next(e);
        }
    };

}
