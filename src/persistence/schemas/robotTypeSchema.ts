import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

const   RobotType = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        code: { type: String, unique: true },
        brand: { type: String},
        model: { type: String},
        description: { type: String},
        taskTypeCode: { type: String }
    },
    {
        timestamps: true 
    } 
    );

    export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotType);

