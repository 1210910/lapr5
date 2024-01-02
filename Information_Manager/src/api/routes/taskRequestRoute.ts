import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";


import ITaskController from '../../controllers/IControllers/ITaskRequestController';
import middlewares from "../middlewares";
import { UserRoles } from "../../domain/user/UserRoles";

const route = Router();

export default (app: Router) => {
    app.use('/taskRequest', route);

    const taskRequestController = Container.get(config.controllers.taskRequest.name) as ITaskController;

    route.get('/accepted',
        (req, res, next) => taskRequestController.getAllAcceptedTaskRequests(req, res, next));

    route.get('/pending',
        (req, res, next) => taskRequestController.getAllPendingTaskRequests(req, res, next));





}