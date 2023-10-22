import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPassagemController from './IControllers/IPassagemController';
import IPassagemService from '../services/IServices/IPassagemService';
import IPassagemDTO from '../dto/IPassagemDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PassagemController implements IPassagemController {
       
    constructor(
        @Inject(config.services.passagem.name) private passagemServiceInstance : IPassagemService
    ) {}

        public async createPassagem(req: Request, res: Response, next: NextFunction){
            try{
                const passagemOrError = await this.passagemServiceInstance.createPassagem(req.body as IPassagemDTO) as Result<IPassagemDTO>;

                if(passagemOrError.isFailure) {
                    return res.status(402).send();
                }

                const passagemDto = passagemOrError.getValue();
                return res.json(passagemDto).status(201);

            }catch (e){
                return next(e);
            }
        };

        public async updatePassagem(req: Request, res: Response, next: NextFunction){
            console.log("Not implemented yet");
            return null;
        };

        public async listPassagem(req: Request, res: Response, next: NextFunction){
            console.log("Not implemented yet");
            return null;
        };
}