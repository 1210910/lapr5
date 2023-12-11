import { Service, Inject } from 'typedi';

import IRoomRepo from "../services/IRepos/IRoomRepo";
import { Room } from "../domain/room/Room";
import { RoomMap } from "../mappers/RoomMap";
import { RoomId } from '../domain/room/RoomId';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';
import {RoomType} from "../domain/room/RoomType";
import {Result} from "../core/logic/Result";
import {element} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

@Service()
export default class RoomRepo implements IRoomRepo {

    private models: any;

    constructor(
        @Inject('RoomSchema') private roomSchema: Model<IRoomPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(roomId: RoomId | string): Promise<boolean> {
        const idX = RoomId instanceof RoomId ? (<RoomId>RoomId).id.toValue() : RoomId;

        const query = { domainId: idX };
        const roomDocument = await this.roomSchema.findOne(query);

        return !!roomDocument === true;
    }

    public async save(room: Room): Promise<Room> {
        const query = { domainId: room.id };
        const RoomDocument = await this.roomSchema.findOne(query);

        try {
            if (RoomDocument === null) {
                const rawRoom: any = RoomMap.toPersistence(room);

                const roomCreated = this.roomSchema.create(rawRoom);

                return RoomMap.toDomain(roomCreated);
            } else {
                RoomDocument.roomCode = room.roomCode.value;
                RoomDocument.floor = room.floor.value;
                RoomDocument.description = room.description.value;
                RoomDocument.width = room.width.value;
                RoomDocument.length = room.length.value;
                RoomDocument.roomType = RoomType[room.roomType];
                await RoomDocument.save();

                return room;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Result<Array<Room>>> {
        const roomRecord = await this.roomSchema.find();
        if (!roomRecord) {
            return Result.fail<Array<Room>>("No rooms found")
        }else{
            const roomDomain = roomRecord.map((room) => {
                return RoomMap.toDomain(room)
            })
            return Result.ok<Array<Room>>(roomDomain)
        }
    }

    public async findByCode(roomCode: Room | string): Promise<Room> {
        const idX = roomCode instanceof Room ? (<Room>roomCode).id.toValue() : roomCode;

        const query = { domainId: idX };
        const RoomRecord = await this.roomSchema.findOne(query);


        return RoomMap.toDomain(RoomRecord);
    }

    public async findByRoomCode(roomCode: string): Promise<Room> {

        const query = { roomCode: roomCode };

        const roomRecord = await this.roomSchema.findOne(query);



        return RoomMap.toDomain(roomRecord);

    }


}
