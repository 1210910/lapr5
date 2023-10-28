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
                const floor = req.params.floor.toString();

                const RoomOrError = await this.RoomServiceInstance.createRoom(req.body as IRoomDTO, floor) as Result<IRoomDTO>;

                if(RoomOrError.isFailure) {
                    return res.status(400).send();
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
            /*try {
                const listOrError = await this.RoomServiceInstance.listRoom() as Result<Array<IRoomDTO>>;

                if (listOrError.isFailure) {
                    return res.status(402).send();
                }

                const roomDto = listOrError.getValue();
                return res.json(roomDto).status(201);

            } catch (e) {
                return next(e);
            }*/
        };
}
