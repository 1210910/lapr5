import { Router} from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/floors',route);

    const floorController = Container.get(config.controllers.floor.name) as IFloorController;

    route.post('',
    celebrate({
        body: Joi.object({
            floorNumber: Joi.number().required(),
            dimension: Joi.number().required(),
            description: Joi.string().required(),
            buildingID: Joi.string().required()
        }),
    }),
    (req,res,next) => floorController.createFloor(req,res,next) );

    route.patch('/:floorId',
    celebrate({
        body: Joi.object({
            floorNumber: Joi.number().required(),
            dimension: Joi.number().required(),
            description: Joi.string().required(),
            buildingID: Joi.string().required()
        }),
    }),
    (req,res,next) => floorController.updateFloor(req,res,next) );

}