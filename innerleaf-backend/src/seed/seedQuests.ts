import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quest from '../models/Quest';

dotenv.config();

const sampleQuests = [
  {
    title: "Mindful Breathing",
    description: "Take 30 seconds to focus on your breath",
    type: "mindfulness",
    difficulty: "easy",
    rewardXP: 10,
    rewardCoins: 5,
    durationMinutes: 1,
    isDaily: true
  },
  {
    title: "Gratitude Journal",
    description: "Write down three things you're grateful for",
    type: "mindfulness",
    difficulty: "easy",
    rewardXP: 15,
    rewardCoins: 8,
    durationMinutes: 3,
    isDaily: true
  },
  {
    title: "Hydration Boost",
    description: "Drink a full glass of water",
    type: "physical",
    difficulty: "easy",
    rewardXP: 5,
    rewardCoins: 3,
    durationMinutes: 1,
    isDaily: true
  },
  {
    title: "Stretch Break",
    description: "Stand up and stretch for 2 minutes",
    type: "physical",
    difficulty: "easy",
    rewardXP: 10,
    rewardCoins: 5,
    durationMinutes: 2,
    isDaily: true
  },
  {
    title: "Digital Detox",
    description: "Take a 5-minute break from screens",
    type: "mindfulness",
    difficulty: "medium",
    rewardXP: 20,
    rewardCoins: 12,
    durationMinutes: 5,
    isDaily: true
  },
  {
    title: "Nature Connection",
    description: "Step outside and feel the sun/air for 2 minutes",
    type: "physical",
    difficulty: "easy",
    rewardXP: 15,
    rewardCoins: 8,
    durationMinutes: 2,
    isDaily: true
  },
  {
    title: "Creative Expression",
    description: "Draw, doodle, or write something creative for 5 minutes",
    type: "creative",
    difficulty: "medium",
    rewardXP: 25,
    rewardCoins: 15,
    durationMinutes: 5,
    isDaily: true
  },
  {
    title: "Kind Act",
    description: "Do one small act of kindness for someone else",
    type: "social",
    difficulty: "easy",
    rewardXP: 20,
    rewardCoins: 10,
    durationMinutes: 2,
    isDaily: true
  },
  {
    title: "Deep Work Session",
    description: "Focus on one task for 25 minutes without distractions",
    type: "mindfulness",
    difficulty: "hard",
    rewardXP: 40,
    rewardCoins: 25,
    durationMinutes: 25,
    isDaily: false
  },
  {
    title: "Movement Meditation",
    description: "Take a 10-minute walk while focusing on your surroundings",
    type: "physical",
    difficulty: "medium",
    rewardXP: 30,
    rewardCoins: 18,
    durationMinutes: 10,
    isDaily: false
  }
];

const seedQuests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innerleaf');
    console.log('Connected to MongoDB');

    // Clear existing quests
    await Quest.deleteMany({});
    console.log('Cleared existing quests');

    // Insert sample quests
    await Quest.insertMany(sampleQuests);
    console.log('Sample quests inserted');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quests:', error);
    mongoose.connection.close();
  }
};

seedQuests();