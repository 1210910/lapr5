import { Router} from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IFloorController from '../../controllers/IControllers/IFloorController';


const route = Router();

export default (app: Router) => {
    app.use('/floor',route);

    const floorController = Container.get(config.controllers.floor.name) as IFloorController;

    route.post('',
    celebrate({
        body: Joi.object({
            floorCode: Joi.string().max(10).required(),
            floorNumber: Joi.number().required(),
            width: Joi.number().required(),
            length: Joi.number().required(),
            description: Joi.string().max(250).optional(),
            buildingID: Joi.string().required()
        }),
    }),
    (req,res,next) => floorController.createFloor(req,res,next) );

    route.patch('/:id',
    celebrate({
        body: Joi.object({
            floorNumber: Joi.number().optional(),
            width: Joi.number().optional(),
            length: Joi.number().optional(),
            description: Joi.string().max(250).optional(),
        }),
    }),
    (req,res,next) => floorController.updateFloor(req,res,next) );

    route.get('', (req,res,next) => floorController.listFloor(req,res,next) );

    route.get('/passageways/:buildingCode', (req,res,next) => floorController.getFloorsWithPassageway(req,res,next) );

}
