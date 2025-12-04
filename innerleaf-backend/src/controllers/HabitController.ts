import { Request, Response } from 'express';
import Habit from '../models/Habit';
import User from '../models/User';

export const createHabit = async (req: Request, res: Response) => {
  try {
    const { name, description, frequency } = req.body;
    const userId = (req as any).userId;

    // Validate frequency
    const validFrequencies = ['daily', 'weekly', 'monthly'];
    if (frequency && !validFrequencies.includes(frequency)) {
      return res.status(400).json({ message: 'Invalid frequency' });
    }

    // Create new habit
    const newHabit = new Habit({
      userId,
      name,
      description,
      frequency: frequency || 'daily'
    });

    await newHabit.save();

    // Add habit to user's habits array
    await User.findByIdAndUpdate(userId, { $push: { habits: newHabit._id } });

    return res.status(201).json({
      message: 'Habit created successfully',
      habit: newHabit
    });
  } catch (error) {
    console.error('Habit creation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const habits = await Habit.find({ userId, isActive: true });

    return res.json({
      habits
    });
  } catch (error) {
    console.error('Get habits error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const completeHabit = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const userId = (req as any).userId;

    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Update habit
    habit.streak += 1;
    habit.lastCompleted = new Date();

    await habit.save();

    // Update user stats
    const user = await User.findById(userId);
    if (user) {
      user.xp += habit.rewardPoints;
      user.coins += Math.floor(habit.rewardPoints / 2);
      await user.save();
    }

    return res.json({
      message: 'Habit completed successfully',
      habit,
      userStats: {
        xp: user?.xp,
        coins: user?.coins
      }
    });
  } catch (error) {
    console.error('Complete habit error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const userId = (req as any).userId;

    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Mark habit as inactive instead of deleting
    habit.isActive = false;
    await habit.save();

    return res.json({
      message: 'Habit deleted successfully'
    });
  } catch (error) {
    console.error('Delete habit error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};