import { type } from "os";
import  {IFloorMapPersistence}  from "../../dataschema/IFloorMapPersistence";
import mongoose from 'mongoose';

const FloorMap = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        floorCode: { type: String, unique: true},
        maze: { type: String},
        ground: { type: String},
        wall: { type: String},
        player: { type: String},
    }
    ,{
        timestamps: true
    }
    );

    export default mongoose.model<IFloorMapPersistence & mongoose.Document>('FloorMap', FloorMap);
