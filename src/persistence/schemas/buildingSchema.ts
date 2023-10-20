import { IBuildingPersistence } from '../../dataschema/IBuildingPersistance';
import mongoose from 'mongoose';

const Building = new mongoose.Schema(
    {
      domainId: { 
        type: String,
        unique: true
      },
      
      name: {
         type: String, 
         required: [true, 'Please enter the name'],
         unique: true 
        },
  
      description: {
        type: String,
        required: [false, 'Please enter the description'],
        index: true,
      },
    },
    { timestamps: true },
  );
  
  export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);
  