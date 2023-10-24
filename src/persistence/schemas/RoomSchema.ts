import { IRoomPersistence } from "../../dataschema/IRoomPersistence";
import mongoose from 'mongoose';

const Room = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        floor: { type: String },
        roomCode: { type: String, unique: true},
        description: { type: String },
        width: {type : Number},
        length: {type : Number},
        roomType: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', Room);
