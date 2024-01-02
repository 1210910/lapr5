import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";



import IVigilanceTaskController from "../../controllers/IControllers/IVigilanceTaskController";
import middlewares from "../middlewares";
import { UserRoles } from "../../domain/user/UserRoles";

const route = Router();

export default (app: Router) => {
    app.use('/vigilanceTasks', route);

    const vigilanceTaskController = Container.get(config.controllers.vigilanceTask.name) as IVigilanceTaskController;

    route.post('',
        middlewares.isAuth,
        middlewares.userRole(UserRoles.USER),
        celebrate({
            body: Joi.object({
                description: Joi.string().max(255).required(),
                roomDest: Joi.string().max(255).required(),
                roomOrig: Joi.string().max(255).required(),
            }),
        }),
        (req, res, next) => vigilanceTaskController.createVigilanceTask(req, res, next));

    route.get('',
        (req, res, next) => vigilanceTaskController.getAllVigilanceTaskRequests(req, res, next));

    route.get('/tasks',
        (req, res, next) => vigilanceTaskController.getAllVigilanceTasks(req, res, next));

    route.get('/requestpending',
        (req, res, next) => vigilanceTaskController.getAllPendingTaskRequests(req, res, next));

    route.get('/pending',
        (req, res, next) => vigilanceTaskController.getAllPendingTasks(req, res, next));

    route.post('/approve',
      celebrate({
            body: Joi.object({
                id: Joi.string().max(255).required(),
            }),
        }),
        (req, res, next) => vigilanceTaskController.approveVigilanceTask(req, res, next));


    route.post('/reject',
      celebrate ({
            body: Joi.object({
                id: Joi.string().max(255).required(),
            }),
        }),
        (req,res,next) => vigilanceTaskController.rejectVigilanceTask(req, res, next) );

        route.get('/filtered',
        (req, res, next) => vigilanceTaskController.getFilteredVigilanceTasks(req, res, next));


    route.post('/start',
        celebrate ({
            body: Joi.object({
                id: Joi.string().max(255).required(),
            }),
        }),
        (req,res,next) => vigilanceTaskController.startVigilanceTask(req, res, next) );


}