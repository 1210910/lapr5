import {Request,Response,NextFunction} from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import IRobotTypeController from "./IControllers/IRobotTypeController";
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotTypeController implements IRobotTypeController {

    constructor(@Inject(config.services.robotType.name) private robotTypeService : IRobotTypeService) {}

    public async createRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeService.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

            if (robotTypeOrError.isFailure) {
                return res.status(400).send();
            }
            const robotTypeDTO = robotTypeOrError.getValue();
            return res.status(201).json( robotTypeDTO );
        }
        catch (e) {
            return next(e);
        }
    };

    public async listRobotTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypesOrError = await this.robotTypeService.listRobotTypes() as Result<IRobotTypeDTO[]>;

            if (robotTypesOrError.isFailure) {
                return res.status(400).send();
            }
            const robotTypesDTO = robotTypesOrError.getValue();
            return res.status(200).json( robotTypesDTO );
        }
        catch (e) {
            return next(e);
        }
    };

}
