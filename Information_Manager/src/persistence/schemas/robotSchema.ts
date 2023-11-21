import { IRobotPersistence } from "../../dataschema/IRobotPersistence";
import mongoose from 'mongoose';

const Robot = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        code: { type: String, unique: true },
        name: { type: String },
        type: { type: String },
        enabled: { type: Boolean },
        description: { type: String },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', Robot);