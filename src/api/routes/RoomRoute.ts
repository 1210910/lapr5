import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IRoomController from '../../controllers/IControllers/IRoomController';

const route = Router();

export default (app: Router) => {
    app.use('/room',route);

    const RoomController = Container.get(config.controllers.room.name) as IRoomController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            floor: Joi.string().required(),
            description: Joi.string().required(),
            width: Joi.number().required(),
            length: Joi.number().required(),
            roomType: Joi.string().valid('classroom','laboratory','anphitheater','office','other').required(),
        }),
    }),
    (req,res,next) => RoomController.createRoom(req,res,next) );

};
