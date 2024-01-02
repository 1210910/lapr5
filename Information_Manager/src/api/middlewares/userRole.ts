import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/userService';

const userRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authServiceInstance = Container.get(AuthService);

      // @ts-ignore
      const userRole = await authServiceInstance.getRole(req.auth.email);

      if (userRole.isFailure) {
        return res.status(401).send(userRole.errorValue());
      }

      if (userRole.getValue() !== requiredRole) {
        return res.status(401).send("You don't have permission to access this resource");
      }

      next();
    } catch (e) {
      console.error(e);
      return res.status(401).send(e.message ?? "You don't have permission to access this resource");
    }
  };
};

export default userRole;
