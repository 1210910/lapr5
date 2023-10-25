import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
    app.use('/buildings',route);

    const buildingController = Container.get(config.controllers.building.name) as IBuildingController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            name: Joi.string(),
            description: Joi.string(),
            maxLength: Joi.number().required(),
            maxWidth: Joi.number().required()
        }),
    }),
    (req,res,next) => buildingController.createBuilding(req,res,next) );

    route.get('',
    (req, res, next) => buildingController.getAllBuildings(req, res, next) );

    route.get('/:min:max',
    (req, res, next) => buildingController.getBuildingsMinMax(req, res, next) );
};
