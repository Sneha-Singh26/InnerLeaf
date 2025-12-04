import mongoose, { Document, Schema } from 'mongoose';

export interface IPlant extends Document {
  userId: mongoose.Types.ObjectId;
  plantType: 'Lotus' | 'Fern' | 'Bonsai' | 'Cactus' | 'Lavender';
  gardenTheme: 'Calm Forest' | 'Cosmic Garden' | 'Cozy Room';
  name: string;
  level: number;
  health: number;
  growthStage: number;
  leaves: number;
  color: string;
  potType: string;
  lastWatered: Date;
  lastFed: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PlantSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plantType: { 
    type: String, 
    enum: ['Lotus', 'Fern', 'Bonsai', 'Cactus', 'Lavender'],
    required: true 
  },
  gardenTheme: { 
    type: String, 
    enum: ['Calm Forest', 'Cosmic Garden', 'Cozy Room'],
    required: true 
  },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  health: { type: Number, default: 100 },
  growthStage: { type: Number, default: 1 },
  leaves: { type: Number, default: 1 },
  color: { type: String, default: '#00ff00' },
  potType: { type: String, default: 'basic' },
  lastWatered: { type: Date, default: Date.now },
  lastFed: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPlant>('Plant', PlantSchema);