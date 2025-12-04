import { Request, Response } from 'express';
import Plant from '../models/Plant';
import User from '../models/User';

export const createPlant = async (req: Request, res: Response) => {
  try {
    const { plantType, gardenTheme, name } = req.body;
    const userId = (req as any).userId; // Assuming userId is attached by auth middleware

    // Validate plant type
    const validPlantTypes = ['Lotus', 'Fern', 'Bonsai', 'Cactus', 'Lavender'];
    if (!validPlantTypes.includes(plantType)) {
      return res.status(400).json({ message: 'Invalid plant type' });
    }

    // Validate garden theme
    const validGardenThemes = ['Calm Forest', 'Cosmic Garden', 'Cozy Room'];
    if (!validGardenThemes.includes(gardenTheme)) {
      return res.status(400).json({ message: 'Invalid garden theme' });
    }

    // Check if user already has a plant
    const existingPlant = await Plant.findOne({ userId });
    if (existingPlant) {
      return res.status(400).json({ message: 'User already has a plant' });
    }

    // Create new plant
    const newPlant = new Plant({
      userId,
      plantType,
      gardenTheme,
      name: name || `${plantType} Plant`
    });

    await newPlant.save();

    // Update user with plant reference
    await User.findByIdAndUpdate(userId, { plant: newPlant._id });

    return res.status(201).json({
      message: 'Plant created successfully',
      plant: newPlant
    });
  } catch (error) {
    console.error('Plant creation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const getPlant = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const plant = await Plant.findOne({ userId });
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    return res.json({
      plant
    });
  } catch (error) {
    console.error('Get plant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const waterPlant = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const plant = await Plant.findOne({ userId });
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    // Update plant stats
    plant.health = Math.min(100, plant.health + 5);
    plant.lastWatered = new Date();
    
    // For visual effect, we might increase growth stage slightly
    if (plant.health > 80 && plant.growthStage < 5) {
      plant.growthStage += 0.1;
    }

    await plant.save();

    return res.json({
      message: 'Plant watered successfully',
      plant
    });
  } catch (error) {
    console.error('Water plant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};

export const feedPlant = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const plant = await Plant.findOne({ userId });
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    // Update plant stats
    plant.health = Math.min(100, plant.health + 10);
    plant.lastFed = new Date();
    
    // Increase leaves and growth stage
    plant.leaves += 1;
    plant.growthStage = Math.min(5, plant.growthStage + 0.2);

    await plant.save();

    return res.json({
      message: 'Plant fed successfully',
      plant
    });
  } catch (error) {
    console.error('Feed plant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};