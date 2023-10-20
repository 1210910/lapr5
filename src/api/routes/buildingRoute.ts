import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBBuildingController from '../../controllers/IControllers/IBuildingController'; 

import config from "../../../config";
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
    app.use('/buildings',route);

    const buildingController = Container.get(config.controllers.building.name) as IBuildingController;

    route.post('',
    celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        }),
    }),
    (req,res,next) => buildingController.createBuilding(req,res,next) );

};