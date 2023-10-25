import { Service, Inject } from 'typedi';

import IRoomRepo from "../services/IRepos/IRoomRepo";
import { Room } from "../domain/Room";
import { RoomMap } from "../mappers/RoomMap";
import { RoomId } from '../domain/RoomId';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

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
                RoomDocument.roomCode = room.roomCode;
                await RoomDocument.save();

                return room;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Room[]> {
        const roomRecord = await this.roomSchema.find();

        return roomRecord.map((item) => {
            return RoomMap.toDomain(item);
        });
    }

    public async findByCode(roomCode: Room | string): Promise<Room> {
        const idX = roomCode instanceof Room ? (<Room>roomCode).id.toValue() : roomCode;

        const query = { domainId: idX };
        const RoomRecord = await this.roomSchema.findOne(query);

        return RoomMap.toDomain(RoomRecord);
    }

}