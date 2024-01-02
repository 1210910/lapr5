import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import { UserRoles } from "../../domain/user/UserRoles";
var userController = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.patch('/editData',
      middlewares.isAuth,
      middlewares.userRole(UserRoles.USER),
  celebrate({
    body: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      phone: Joi.number(),
      nif: Joi.number(),
    }),
  }),
  (req, res, next) => userController.editUser(req, res, next));

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

  route.post('/delete/', middlewares.isAuth, (req, res, next) => userController.deleteAccount(req, res, next));

  app.use('/users', route);

  
};
