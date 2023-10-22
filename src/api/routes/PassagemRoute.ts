import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IPassagemController from '../../controllers/IControllers/IPassagemController';

const route = Router();

export default (app: Router) => {
    app.use('/passagens',route);

    const passagemController = Container.get(config.controllers.building.name) as IPassagemController;

    route.post('',
    celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        }),
    }),
    (req,res,next) => passagemController.createPassagem(req,res,next) );

};