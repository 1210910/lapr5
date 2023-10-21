import { IPassagemPersistence } from "../../dataschema/IPassagemPersistence";
import { Piso } from "../../domain/Piso";
import mongoose from 'mongoose';

const Passagem = new mongoose.Schema(
    {
        _id: { type: String, unique: true },
        piso1: { type: Piso, unique: false },
        piso2: { type: Piso, unique: false }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPassagemPersistence & mongoose.Document>('Passagem', Passagem);