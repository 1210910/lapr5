import { IFloorPersistence } from "../../dataschema/IFloorPersistence";
import mongoose from 'mongoose';

const Floor = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        floorCode: { type: String, unique: true },
        floorNumber: { type: Number, unique: true },
        width: { type: Number},
        height: { type: Number},
        description: { type: String},
        buildingID: { type: String }
    },
    {
        timestamps: true
    } 
    );

    export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', Floor);