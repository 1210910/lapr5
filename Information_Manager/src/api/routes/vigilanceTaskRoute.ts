import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";



import IVigilanceTaskController from "../../controllers/IControllers/IVigilanceTaskController";

const route = Router();

export default (app: Router) => {
    app.use('/vigilanceTasks', route);

    const deliveryTaskController = Container.get(config.controllers.vigilanceTask.name) as IVigilanceTaskController;

    route.post('',
        celebrate({
            body: Joi.object({
                description: Joi.string().max(255).required(),
                user: Joi.string().max(255).required(),
                roomDest: Joi.string().max(255).required(),
                roomOrig: Joi.string().max(255).required(),
                destName : Joi.string().max(255).required(),
                origName : Joi.string().max(255).required(),
                destPhoneNumber : Joi.string().max(255).required(),
                origPhoneNumber : Joi.string().max(255).required(),
                code : Joi.number().min(4).max(6).required(),
            }),
        }),
        (req, res, next) => deliveryTaskController.createVigilanceTask(req, res, next));

    route.get('',
        (req, res, next) => deliveryTaskController.getAllVigilanceTaskRequests(req, res, next));

    route.get('/tasks',
        (req, res, next) => deliveryTaskController.getAllVigilanceTasks(req, res, next));

    route.get('/requestpending',
        (req, res, next) => deliveryTaskController.getAllPendingTaskRequests(req, res, next));

    route.get('/pending',
        (req, res, next) => deliveryTaskController.getAllPendingTasks(req, res, next));

    route.post('/approve',celebrate({
            body: Joi.object({
                id: Joi.string().max(255).required(),
            }),
        }),
        (req, res, next) => deliveryTaskController.approveVigilanceTask(req, res, next));


    route.post('reject',celebrate ({
            body: Joi.object({
                id: Joi.string().max(255).required(),
            }),
        }),
        (req,res,next) => deliveryTaskController.rejectVigilanceTask(req, res, next) );







}