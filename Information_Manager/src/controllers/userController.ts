import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../services/userService';
import { IUserDTO } from '../dto/IUserDTO';
import logger from "../loaders/logger";



export async function signUp(req: Request, res: Response, next: NextFunction) {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

    try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) {
            logger.debug(userOrError.errorValue());
            return res.status(401).send(userOrError.errorValue());
        }

        const { userDTO, token } = userOrError.getValue();
        return res.status(201).json({ userDTO, token });
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

export async function editUser(req: Request, res: Response, next: NextFunction) {
      try {

        const authServiceInstance = Container.get(AuthService);

          const userOrError = await authServiceInstance.editUser(req.body as IUserDTO);

          if (userOrError.isFailure) {
              return res.status(400).json({ error: userOrError.errorValue() });
          }

          const userDTO = userOrError.getValue();
          return res.status(200).json(userDTO);

      } catch (e) {
          return next(e);
      }
  };

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const authServiceInstance = Container.get(AuthService);
        //@ts-ignore
        const userOrError = await authServiceInstance.profile(req.auth.email);

        if (userOrError.isFailure) {
            return res.status(401).send(userOrError.errorValue());
        }

        const userDTO = userOrError.getValue();
        return res.status(200).json(userDTO);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

export async function deleteAccount(req: Request, res: Response, next: NextFunction) {
    logger.debug('Calling Delete-Account endpoint with body: %o', req.body);

    try {
        const authServiceInstance = Container.get(AuthService);
        //@ts-ignore
        const id = req.auth.id;
        //@ts-ignore
        const result = await authServiceInstance.deleteAccount(req.auth.email);
        authServiceInstance.deleteAuth0Account(id);

        if (result.isFailure)
            return res.json().status(403);

        return res.json().status(200);

    } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
    }
}
