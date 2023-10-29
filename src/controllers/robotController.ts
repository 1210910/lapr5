import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import jsonPatch from 'json-patch';
import IRobotController from './IControllers/IRobotController';
import IRobotService from '../services/IServices/IRobotService';
import IRobotDTO from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController {
    constructor(
        @Inject(config.services.robot.name) private robotServiceInstance: IRobotService
    ) { }

    public async createRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }

            const robotDto = robotOrError.getValue();
            return res.status(201).json(robotDto);

        } catch (e) {
            return next(e);
        }
    };

    public async enableDisableRobot(req: Request, res: Response, next: NextFunction) {
       try{
        const patchDocument = req.body;

        const robotOrError = await this.robotServiceInstance.enableDisableRobot(req.params.code as string, patchDocument as IRobotDTO) as Result<IRobotDTO>;

        if (robotOrError.isFailure) {
            return res.status(400).json({ error: robotOrError.errorValue() });
        }

        const robotDto = robotOrError.getValue();
        return res.status(204).json(robotDto);

       }catch(e){
        return next(e);
       }
    };

    public async listRobot(req: Request, res: Response, next: NextFunction) {
        try{
            const robotOrError = await this.robotServiceInstance.listRobot() as Result<Array<IRobotDTO>>;

            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }

            const robotDto = robotOrError.getValue();
            return res.status(201).json(robotDto);
        } catch (e) {
            return next(e);
        }
    };
}
