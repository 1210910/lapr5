import { IRoomPersistence } from "../../dataschema/IRoomPersistence";
import mongoose from 'mongoose';
import { RoomType } from "../../domain/room/RoomType";

const Room = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        roomCode: { type: String, unique: true},
        floor: { type: String },
        description: { type: String },
        width: {type : Number},
        length: {type : Number},
        roomType: { type: String, enum: Object.values(RoomType) }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', Room);
