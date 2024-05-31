import { Router } from 'express';
import {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
} from '../controllers/destinationController';

const router = Router();

router.post('/destinations', createDestination);
router.get('/destinations', getDestinations);
router.get('/destinations/:id', getDestinationById);
router.put('/destinations/:id', updateDestination);
router.delete('/destinations/:id', deleteDestination);

export default router;
