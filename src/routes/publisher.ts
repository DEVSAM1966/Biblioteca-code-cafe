import { Router } from 'express';
import { getPublisher } from '../controllers/publisherController';

const router = Router();

router.get('/:id', getPublisher);

export default router;