import mongoose, { Document, Schema } from 'mongoose';

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  lastCompleted: Date;
  createdAt: Date;
  isActive: boolean;
  rewardPoints: number;
}

const HabitSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  frequency: { 
    type: String, 
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: Date },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  rewardPoints: { type: Number, default: 10 }
});

export default mongoose.model<IHabit>('Habit', HabitSchema);