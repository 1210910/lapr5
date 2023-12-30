import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import config from "../../../config";
import IPassagewayController from "../../controllers/IControllers/IPassagewayController";
import middlewares from "../middlewares";
import { UserRoles } from "../../domain/user/UserRoles";

const route = Router();

export default (app: Router) => {
  app.use("/passageway", route);

  const passagewayController = Container.get(config.controllers.passageway.name) as IPassagewayController;

  // Create a passageway
  route.post("",
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    celebrate({
      body: Joi.object({
        floor1: Joi.string().required(),
        floor2: Joi.string().required(),
        description: Joi.string()
      })
    }),
    (req, res, next) => {
      passagewayController.createPassageway(req, res, next);
    });

  route.patch("/:passageCode/",
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    celebrate({
      body: Joi.object({
        floor1: Joi.string(),
        floor2: Joi.string(),
        description: Joi.string()
      })
    }),
    (req, res, next) => {
      passagewayController.updatePassageway(req, res, next);
    });


  // List all passageway
  route.get("",
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    (req, res, next) => passagewayController.listPassageway(req, res, next));

  route.get('/algav', (req,res,next) => passagewayController.listPassageway(req,res,next) );
};