import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import config from "../../../config";
import IRobotTypeController from "../../controllers/IControllers/IRobotTypeController";

const route = Router();

export default (app: Router) => {
    app.use("/robotType", route);

    const robotTypeController = Container.get(config.controllers.robotType.name) as IRobotTypeController;

    route.post(
        "",
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                brand: Joi.string().required(),
                model: Joi.string().required(),
                description: Joi.string().required(),
                taskTypeCode: Joi.string().required(),
            }),
        }),
        (req, res, next) => robotTypeController.createRobotType(req, res, next)
    );
