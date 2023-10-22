import { IRoomPersistence } from "../../dataschema/IRoomPersistence";
import mongoose from 'mongoose';

const Room = new mongoose.Schema(
    {
        _id: { type: String, unique: true },
        floor: { type: String },
        roomCode: { type: String, unique: true},
        location: { type: String },
        description: { type: String },
        roomDimensions: { type: String },
        roomType: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', Room);