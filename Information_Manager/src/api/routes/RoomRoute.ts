import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import IRoomController from '../../controllers/IControllers/IRoomController';
import middlewares from "../middlewares";
import { UserRoles } from "../../domain/user/UserRoles";

const route = Router();

export default (app: Router) => {
    app.use('/room',route);

    const RoomController = Container.get(config.controllers.room.name) as IRoomController;

    route.post('/:floor',
      middlewares.isAuth,
      middlewares.userRole(UserRoles.CAMPUS),
    celebrate({
        body: Joi.object({
            roomCode: Joi.string().max(50).required(),
            description: Joi.string().max(250),
            width: Joi.number().required(),
            length: Joi.number().required(),
            roomType: Joi.string().valid('classroom','laboratory','anphitheater','office','other').required(),
        }),
    }),
    (req,res,next) => RoomController.createRoom(req,res,next) );


  route.get('',
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    (req,res,next) => RoomController.listAllRooms(req,res,next) );

};
