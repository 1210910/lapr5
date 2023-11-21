import { ILiftPersistence } from '../../dataschema/ILiftPersistance';
import mongoose from 'mongoose';

const Lift = new mongoose.Schema(
    {
      domainId: {
        type: String,
        unique: true,
      },
      code: {
        type: String,
        unique: true,
        required: [true, 'Please enter code'],
      },
      buildingCode: {
         type: String,
         unique: false
      },
      floors: [{
        type: String,
        index: true,
      }],
      brand: {
        type: String,
        unique: false,
      },
      model: {
        type: String,
        unique: false,
      },
      serialNumber: {
        type: String,
        unique: false,
      },
      description: {
        type: String,
        unique: false,
      },
    },
    { timestamps: true },
  );

  export default mongoose.model<ILiftPersistence & mongoose.Document>('Lift', Lift);
