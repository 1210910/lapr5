import { IPisoPersistence } from "../../dataschema/IPisoPersistence";
import mongoose from 'mongoose';

const PisoSchema = new mongoose.Schema(
    {
        _id: { type: String, unique: true },
        numero: { type: Number, unique: true },
        descrição: { type: String, unique: true },
        edificio: { type: String, unique: true }
    },
    {
        timestamps: true
    }
    );