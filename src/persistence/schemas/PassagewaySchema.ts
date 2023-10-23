import { IPassagewayPersistence } from "../../dataschema/IPassagewayPersistence";
import mongoose from 'mongoose';

const Passageway = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        floor1: { type: String },
        floor2: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPassagewayPersistence & mongoose.Document>('Passageway', Passageway);