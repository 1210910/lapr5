import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IPassagewayController from '../../controllers/IControllers/IPassagewayController';

const route = Router();

export default (app: Router) => {
    app.use('/passageway',route);

    const passagewayController = Container.get(config.controllers.passageway.name) as IPassagewayController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            piso1: Joi.string().required(),
            piso2: Joi.string().required(),
        }),
    }),
    (req,res,next) => passagewayController.createPassageway(req,res,next) );

};