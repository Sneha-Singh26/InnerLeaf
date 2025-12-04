import { Router } from 'express';
import { createPlant, getPlant, waterPlant, feedPlant } from '../controllers/PlantController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, createPlant);
router.get('/', authenticateToken, getPlant);
router.post('/water', authenticateToken, waterPlant);
router.post('/feed', authenticateToken, feedPlant);

export default router;