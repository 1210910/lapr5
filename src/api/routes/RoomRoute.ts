import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IRoomController from '../../controllers/IControllers/IRoomController';

const route = Router();

export default (app: Router) => {
    app.use('/Room',route);

    const RoomController = Container.get(config.controllers.room.name) as IRoomController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            piso: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            roomDimensions: Joi.object().required(),
            roomType: Joi.string().required(),
        }),
    }),
    (req,res,next) => RoomController.createRoom(req,res,next) );

};