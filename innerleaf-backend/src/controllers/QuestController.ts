import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Quest from '../models/Quest';
import User from '../models/User';

export const getDailyQuests = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    // Get 3-5 random daily quests
    const quests = await Quest.aggregate([
      { $match: { isDaily: true } },
      { $sample: { size: 5 } }
    ]);

    return res.json({
      quests
    });
  } catch (error) {
    console.error('Get daily quests error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const completeQuest = async (req: Request, res: Response) => {
  try {
    const { questId } = req.params;
    const userId = (req as any).userId;

    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add quest to user's completed quests if not already there
    if (!user.completedQuests.includes(new mongoose.Types.ObjectId(questId))) {
      user.completedQuests.push(new mongoose.Types.ObjectId(questId));
      user.xp += quest.rewardXP;
      user.coins += quest.rewardCoins;
      await user.save();
    }

    return res.json({
      message: 'Quest completed successfully',
      userStats: {
        xp: user.xp,
        coins: user.coins
      }
    });
  } catch (error) {
    console.error('Complete quest error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const getQuestHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).populate('completedQuests');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      completedQuests: user.completedQuests
    });
  } catch (error) {
    console.error('Get quest history error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};