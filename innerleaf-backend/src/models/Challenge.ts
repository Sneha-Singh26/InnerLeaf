import mongoose, { Document, Schema } from 'mongoose';

export interface IChallenge extends Document {
  name: string;
  description: string;
  season: 'winter' | 'spring' | 'summer' | 'autumn';
  startDate: Date;
  endDate: Date;
  participants: mongoose.Types.ObjectId[];
  rewards: {
    rarePlants: string[];
    exclusivePots: string[];
    specialBackgrounds: string[];
  };
  createdAt: Date;
}

const ChallengeSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  season: { 
    type: String, 
    enum: ['winter', 'spring', 'summer', 'autumn'],
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rewards: {
    rarePlants: [{ type: String }],
    exclusivePots: [{ type: String }],
    specialBackgrounds: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);