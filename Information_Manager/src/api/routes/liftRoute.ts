import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ILiftController from '../../controllers/IControllers/ILiftController';

const route = Router();

export default (app: Router) => {
    app.use('/lift',route);

    const liftController = Container.get(config.controllers.lift.name) as ILiftController;

    route.post('',
    celebrate({
        body: Joi.object({
            code: Joi.string(),
            buildingCode: Joi.string().required(),
            floors: Joi.array().items(Joi.string()).required(),
            brand: Joi.string().max(50).optional(),
            model: Joi.string().max(50).optional(),
            serialNumber: Joi.string().max(50).optional(),
            description: Joi.string().max(250).optional()
        }),
    }),
    (req,res,next) => liftController.createLift(req,res,next) );

    route.patch('/:id',
    celebrate({
        body: Joi.object({
            floors: Joi.array().items(Joi.string()).optional(),
            brand: Joi.string().max(50).optional(),
            model: Joi.string().max(50).optional(),
            serialNumber: Joi.string().max(50).optional(),
            description: Joi.string().max(250).optional()
        }),
    }),
    (req,res,next) => liftController.updateLift(req,res,next) );

    route.get('',(req,res,next) => liftController.listAllLift(req,res,next) );
    route.get('/:buildingCode', (req,res,next) => liftController.listLift(req,res,next) );
    route.get('/algav',(req,res,next) => liftController.listAllLift(req,res,next) );


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


}
