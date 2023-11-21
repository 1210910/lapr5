import { IBuildingPersistence } from '../../dataschema/IBuildingPersistance';
import mongoose from 'mongoose';

const Building = new mongoose.Schema(
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
      name: {
         type: String
      },
      description: {
        type: String,
        unique:false,
      },
      maxLength: {
        type: Number,
        unique: false,
      },
      maxWidth: {
        type: Number,
        unique: false,
      },
    },
    { timestamps: true },
  );

  export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);
