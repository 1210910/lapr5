import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import config from "../../../config";
import IFloorMapController from "../../controllers/IControllers/IFloorMapController";
import middlewares from "../middlewares";
import { UserRoles } from "../../domain/user/UserRoles";


const route = Router();

export default (app: Router) => {
  app.use("/floorMap", route);

  const floorMapController = Container.get(config.controllers.floorMap.name) as IFloorMapController;
  const multer = require("multer");
  const upload = multer({ dest: "uploads/" });

  route.post("",
    upload.single("file"),
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    celebrate({
      body: Joi.object({
        floorCode: Joi.string().required()
      })
    }),
    async (req, res, next) => {
      try {

        await floorMapController.createFloorMap(req, res, next);
      } catch (error) {
        // Handle any error that might occur
        next(error);
      }
    }
  );
  route.get("",
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    (req, res, next) => floorMapController.getFloorMaps(req, res, next));

  route.get("/:floorCode",
    middlewares.isAuth,
    middlewares.userRole(UserRoles.CAMPUS),
    (req, res, next) => floorMapController.getFloorMap(req, res, next));
}
