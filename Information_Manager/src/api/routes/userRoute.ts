import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';

var userController = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.number().required(),
        nif: Joi.number(),
        password: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    (req, res, next) => userController.signUp(req, res, next)
  );

  route.get("/profile/", middlewares.isAuth, (req, res, next) => userController.getProfile(req, res, next));

  route.post('/delete', middlewares.isAuth, (req, res, next) => userController.deleteAccount(req, res, next));

  app.use('/users', route);
};
