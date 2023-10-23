import { IFloorPersistence } from "../../dataschema/IFloorPersistence";
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
    {
        _id: { type: String, unique: true },
        floorNumber: { type: Number, unique: true },
        dimension: { type: Number, unique: true },
        description: { type: String, unique: true },
        buildingID: { type: String, unique: true }
    },
    {
        timestamps: true
    }
    );