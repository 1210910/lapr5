import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ILiftController from '../../controllers/IControllers/ILiftController';

const route = Router();

export default (app: Router) => {
    app.use('/lift',route);

    const liftController = Container.get(config.controllers.lift.name) as ILiftController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            buildingCode: Joi.string().required(),
            floors: Joi.array().items(Joi.string()).required(),
            brand: Joi.string().max(50).optional(),
            model: Joi.string().max(50).optional(),
            serialNumber: Joi.string().max(50).optional(),
            description: Joi.string().max(250).optional()
        }),
    }),
    (req,res,next) => liftController.createLift(req,res,next) );







}
