import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Challenge from '../models/Challenge';
import User from '../models/User';

export const getCurrentChallenges = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    
    // Get active challenges
    const challenges = await Challenge.find({
      startDate: { $lte: now },
      endDate: { $gte: now }
    });

    return res.json({
      challenges
    });
  } catch (error) {
    console.error('Get current challenges error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const joinChallenge = async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    const userId = (req as any).userId;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is already participating
    if (challenge.participants.includes(new mongoose.Types.ObjectId(userId))) {
      return res.status(400).json({ message: 'User already joined this challenge' });
    }

    // Add user to challenge participants
    challenge.participants.push(new mongoose.Types.ObjectId(userId));
    await challenge.save();

    return res.json({
      message: 'Successfully joined challenge',
      challenge
    });
  } catch (error) {
    console.error('Join challenge error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const getChallengeProgress = async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    const userId = (req as any).userId;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // In a real implementation, you would calculate actual progress
    // For now, we'll just return participant status
    const isParticipant = challenge.participants.includes(userId);

    return res.json({
      challenge: {
        id: challenge._id,
        name: challenge.name,
        description: challenge.description,
        startDate: challenge.startDate,
        endDate: challenge.endDate,
        isParticipant
      }
    });
  } catch (error) {
    console.error('Get challenge progress error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};