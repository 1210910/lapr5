import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import config from "../../../config";
import IFloorMapController from "../../controllers/IControllers/IFloorMapController";


const route = Router();

export default (app: Router) => {
    app.use("/floorMap", route);

    const floorMapController = Container.get(config.controllers.floorMap.name) as IFloorMapController;

    route.post("",
    celebrate({
        body: Joi.object({
            floorCode: Joi.string().required(),
            rooms: Joi.array().items(Joi.object({
                roomCode: Joi.string().required(),
                positionX: Joi.number().required(),
                positionY: Joi.number().required(),
            })).required(),
            elevator: Joi.array().items(Joi.object({
            elevatorCode : Joi.string().required(),
            positionX: Joi.number().required(),
            positionY: Joi.number().required(),
            })).required().max(1),
           
        })
    }),
    async (req, res, next) => { await floorMapController.createFloorMap(req, res, next) }
    );
       

}