import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Challenge from '../models/Challenge';

dotenv.config();

const sampleChallenges = [
  {
    name: "Winter Calm Challenge",
    description: "Embrace the stillness and introspection of winter with daily mindfulness practices",
    season: "winter",
    startDate: new Date(new Date().getFullYear(), 11, 1), // December 1st
    endDate: new Date(new Date().getFullYear(), 11, 31),  // December 31st
    rewards: {
      rarePlants: ["Crystal Lotus", "Snowdrop Fern"],
      exclusivePots: ["Frosted Glass Pot", "Ice Crystal Vase"],
      specialBackgrounds: ["Snowy Mountain", "Cozy Fireplace"]
    }
  },
  {
    name: "Spring Growth Challenge",
    description: "Celebrate renewal and growth with activities that promote personal development",
    season: "spring",
    startDate: new Date(new Date().getFullYear(), 2, 1), // March 1st
    endDate: new Date(new Date().getFullYear(), 2, 31),  // March 31st
    rewards: {
      rarePlants: ["Blossom Bonsai", "Emerald Lavender"],
      exclusivePots: ["Pastel Ceramic Pot", "Rainbow Glazed Vase"],
      specialBackgrounds: ["Cherry Blossom Grove", "Green Meadow"]
    }
  },
  {
    name: "Summer Motivation Quest",
    description: "Boost your energy and motivation with outdoor activities and social connections",
    season: "summer",
    startDate: new Date(new Date().getFullYear(), 5, 1), // June 1st
    endDate: new Date(new Date().getFullYear(), 5, 30),  // June 30th
    rewards: {
      rarePlants: ["Sunfire Cactus", "Golden Fern"],
      exclusivePots: ["Beach Sand Pot", "Ocean Wave Vase"],
      specialBackgrounds: ["Sandy Beach", "Mountain Lake"]
    }
  },
  {
    name: "Autumn Reflection Journey",
    description: "Practice gratitude and reflection as you prepare for the year's end",
    season: "autumn",
    startDate: new Date(new Date().getFullYear(), 8, 1), // September 1st
    endDate: new Date(new Date().getFullYear(), 8, 30),  // September 30th
    rewards: {
      rarePlants: ["Harvest Bonsai", "Amber Lavender"],
      exclusivePots: ["Rustic Wood Planter", "Copper Bronze Pot"],
      specialBackgrounds: ["Autumn Forest", "Harvest Field"]
    }
  }
];

const seedChallenges = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innerleaf');
    console.log('Connected to MongoDB');

    // Clear existing challenges
    await Challenge.deleteMany({});
    console.log('Cleared existing challenges');

    // Insert sample challenges
    await Challenge.insertMany(sampleChallenges);
    console.log('Sample challenges inserted');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding challenges:', error);
    mongoose.connection.close();
  }
};

seedChallenges();