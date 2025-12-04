import { Router } from 'express';
import { 
  createHabit, 
  getHabits, 
  completeHabit, 
  deleteHabit 
} from '../controllers/HabitController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, createHabit);
router.get('/', authenticateToken, getHabits);
router.put('/:habitId/complete', authenticateToken, completeHabit);
router.delete('/:habitId', authenticateToken, deleteHabit);

export default router;