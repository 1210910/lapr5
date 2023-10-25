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
            floorCode: Joi.string().required(),
            floorNumber: Joi.number().required(),
            width: Joi.number().required(),
            height: Joi.number().required(),
            description: Joi.string().required(),
            buildingID: Joi.string().required()
        }),
    }),
    (req,res,next) => floorController.createFloor(req,res,next) );

    route.put('/:id',
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