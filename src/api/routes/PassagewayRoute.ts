import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IPassagewayController from '../../controllers/IControllers/IPassagewayController';

const route = Router();

export default (app: Router) => {
    app.use('/passageway',route);

    const passagewayController = Container.get(config.controllers.passageway.name) as IPassagewayController;

    // Create a passageway
    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            floor1: Joi.string().required(),
            floor2: Joi.string().required(),
            description: Joi.string(),
        }),
    }),
    (req,res,next) => {
        console.log(req.body); //Debug
        passagewayController.createPassageway(req,res,next);
    });

    // Update totally a passageway
    route.put('/:passageCode/',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            floor1: Joi.string().required(),
            floor2: Joi.string().required(),
            description: Joi.string(),
        }),
    }),
    (req,res,next) => {
        console.log(req.body); //Debug
        passagewayController.updatePassageway(req,res,next);
    });


    // List all passageway
    route.get('', (req,res,next) => passagewayController.listPassageway(req,res,next) );
};