import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
    app.use('/buildings',route);

    const buildingController = Container.get(config.controllers.building.name) as IBuildingController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string().max(5).required(),
            name: Joi.string().max(50).optional(),
            description: Joi.string().max(255).optional(),
            maxLength: Joi.number().required(),
            maxWidth: Joi.number().required()
        }),
    }),
    (req,res,next) => buildingController.createBuilding(req,res,next) );

    route.get('',
    (req, res, next) => buildingController.getAllBuildings(req, res, next) );

  route.patch('/:code',
    celebrate({
      body: Joi.object({
        name: Joi.string().max(50).optional(),
        description: Joi.string().max(255).optional(),
        maxLength: Joi.number().optional(),
        maxWidth: Joi.number().optional()
      }),
    }),
    (req, res, next) => {

      buildingController.editBuilding(req, res, next)
    });





  route.get('/:min/:max/',
    (req, res, next) => buildingController.getBuildingsMinMax(req, res, next) );

    route.use((err, req, res, next) => {
      if (err.isJoi) {
        // Erro de validação do Joi
        res.status(400).json({
          error: "Validation error",
          details: err.details.map(detail => detail.message),
        });
      } else {
        // Outros erros
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


  };
