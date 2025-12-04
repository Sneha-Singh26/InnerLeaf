import mongoose, { Document, Schema } from 'mongoose';

export interface IQuest extends Document {
  title: string;
  description: string;
  type: 'mindfulness' | 'physical' | 'emotional' | 'social' | 'creative';
  difficulty: 'easy' | 'medium' | 'hard';
  rewardXP: number;
  rewardCoins: number;
  durationMinutes: number;
  isDaily: boolean;
  createdAt: Date;
  expiresAt: Date;
}

const QuestSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['mindfulness', 'physical', 'emotional', 'social', 'creative'],
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  rewardXP: { type: Number, default: 10 },
  rewardCoins: { type: Number, default: 5 },
  durationMinutes: { type: Number, default: 5 },
  isDaily: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

export default mongoose.model<IQuest>('Quest', QuestSchema);