import { Router } from 'express';
import { 
  getDailyQuests, 
  completeQuest, 
  getQuestHistory 
} from '../controllers/QuestController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/daily', authenticateToken, getDailyQuests);
router.post('/:questId/complete', authenticateToken, completeQuest);
router.get('/history', authenticateToken, getQuestHistory);

export default router;