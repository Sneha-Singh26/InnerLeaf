import { Router } from 'express';
import { 
  getCurrentChallenges, 
  joinChallenge, 
  getChallengeProgress 
} from '../controllers/ChallengeController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getCurrentChallenges);
router.post('/:challengeId/join', authenticateToken, joinChallenge);
router.get('/:challengeId/progress', authenticateToken, getChallengeProgress);

export default router;