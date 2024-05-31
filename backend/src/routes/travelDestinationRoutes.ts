import { Router } from 'express';
import {
  addDestinationToTravel,
  removeDestinationFromTravel
} from '../controllers/travelDestinationController';

const router = Router();

router.post('/travels/:travelId/destinations/:destinationId', addDestinationToTravel);
router.delete('/travels/:travelId/destinations/:destinationId', removeDestinationFromTravel);

export default router;
