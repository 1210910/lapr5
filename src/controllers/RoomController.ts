import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoomController from './IControllers/IRoomController';
import IRoomService from '../services/IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoomController implements IRoomController {
       
    constructor(
        @Inject(config.services.room.name) private RoomServiceInstance : IRoomService
    ) {}

        public async createRoom(req: Request, res: Response, next: NextFunction){
            try{
                const RoomOrError = await this.RoomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;

                if(RoomOrError.isFailure) {
                    return res.status(402).send();
                }

                const RoomDto = RoomOrError.getValue();
                return res.json(RoomDto).status(201);

            }catch (e){
                return next(e);
            }
        };

        public async updateRoom(req: Request, res: Response, next: NextFunction){
            console.log("Not implemented yet");
            return null;
        };

        public async listRoom(req: Request, res: Response, next: NextFunction){
            console.log("Not implemented yet");
            return null;
        };
}