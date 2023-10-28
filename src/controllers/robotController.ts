import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

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
                return res.status(400).send(robotOrError.errorValue());
            }

            const robotDto = robotOrError.getValue();
            return res.status(201).json(robotDto);

        } catch (e) {
            return next(e);
        }
    };

    public async enableRobot(req: Request, res: Response, next: NextFunction) {
        console.log("Not implemented");
        return null;
    };

    public async listRobot(req: Request, res: Response, next: NextFunction) {
        try{
            const robotOrError = await this.robotServiceInstance.listRobot() as Result<Array<IRobotDTO>>;

            if (robotOrError.isFailure) {
                return res.status(404).send(robotOrError.errorValue());
            }

            const robotDto = robotOrError.getValue();
            return res.status(201).json(robotDto);
        } catch (e) {
            return next(e);
        }
    };
}
