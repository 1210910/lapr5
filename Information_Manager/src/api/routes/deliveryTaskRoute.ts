import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";


import IDeliveryTaskController from '../../controllers/IControllers/IDeliveryTaskController';
import middlewares from "../middlewares";
import { UserRoles } from "../../domain/user/UserRoles";

const route = Router();

export default (app: Router) => {
    app.use('/deliveryTasks', route);

    const deliveryTaskController = Container.get(config.controllers.deliveryTask.name) as IDeliveryTaskController;

    route.post('',
        middlewares.isAuth,
        middlewares.userRole(UserRoles.USER),
        celebrate({
            body: Joi.object({
                description: Joi.string().max(255).required(),
                roomDest: Joi.string().max(255).required(),
                roomOrig: Joi.string().max(255).required(),
                destName : Joi.string().max(255).required(),
                origName : Joi.string().max(255).required(),
                destPhoneNumber : Joi.string().max(255).required(),
                origPhoneNumber : Joi.string().max(255).required(),
                confirmationCode : Joi.string().min(4).max(6).required(),
            }),
        }),
        (req, res, next) => deliveryTaskController.createDeliveryTask(req, res, next));

    route.get('',
        (req, res, next) => deliveryTaskController.getAllDeliveryTaskRequests(req, res, next));

    route.get('/tasks',
        (req, res, next) => deliveryTaskController.getAllDeliveryTasks(req, res, next));

    route.get('/requestpending',
        (req, res, next) => deliveryTaskController.getAllPendingTaskRequests(req, res, next));

    route.get('/pending',
        (req, res, next) => deliveryTaskController.getAllPendingTasks(req, res, next));

    route.post('/approve',
      celebrate({
        body: Joi.object({
            id: Joi.string().max(255).required(),
        }),
    }),
    (req, res, next) => deliveryTaskController.approveDeliveryTask(req, res, next));


    route.post('/reject',
      celebrate ({
        body: Joi.object({
        id: Joi.string().max(255).required(),
    }),
    }),
    (req,res,next) => deliveryTaskController.rejectDeliveryTask(req, res, next) );

    route.post('/start',
      celebrate ({
        body: Joi.object({
        id: Joi.string().max(255).required(),
    }),
    }),
    (req,res,next) => deliveryTaskController.startDeliveryTask(req, res, next) );

    route.get('/filtered',
    (req, res, next) => deliveryTaskController.getFilteredDeliveryTasks(req, res, next));


}