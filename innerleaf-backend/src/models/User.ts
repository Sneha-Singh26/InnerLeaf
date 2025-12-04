import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date;
  plant: mongoose.Types.ObjectId;
  habits: mongoose.Types.ObjectId[];
  completedQuests: mongoose.Types.ObjectId[];
  xp: number;
  coins: number;
  streak: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  plant: { type: Schema.Types.ObjectId, ref: 'Plant' },
  habits: [{ type: Schema.Types.ObjectId, ref: 'Habit' }],
  completedQuests: [{ type: Schema.Types.ObjectId, ref: 'Quest' }],
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  streak: { type: Number, default: 0 }
});

export default mongoose.model<IUser>('User', UserSchema);