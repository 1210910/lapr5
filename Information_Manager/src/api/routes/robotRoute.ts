import { Router} from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IRobotController from '../../controllers/IControllers/IRobotController';

const route = Router();

export default (app: Router) => {
    app.use('/robot',route);

    const robotController = Container.get(config.controllers.robot.name) as IRobotController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            name: Joi.string().required(),
            type: Joi.string().required(),
            enabled: Joi.boolean().required(),
            description: Joi.string().required(),
        }),
    }),
    (req,res,next) => robotController.createRobot(req,res,next) );

    route.get('', (req,res,next) => robotController.listRobot(req,res,next) );



    route.patch('/:code',
    celebrate({
        body: Joi.array().items(Joi.object({
            op: Joi.string().required().valid('replace'),
            path: Joi.string().required().valid('/enabled'),
            value: Joi.boolean().required().valid(true,false)
        })),
    }),
    (req,res,next) => robotController.enableDisableRobot(req,res,next) );




}
