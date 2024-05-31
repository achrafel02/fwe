import { Router } from 'express';
import {
  createTravel,
  getTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
  searchTravels,
  addDestinationToTravel,
  removeDestinationFromTravel
} from '../controllers/travelController';
import { validateSearchParams } from '../middleware/validationMiddleware';

const router = Router();

// Grundlegende CRUD-Routen für Reisen
router.post('/travels', createTravel);
router.get('/travels', getTravels);
router.get('/travels/search', validateSearchParams, searchTravels);
router.get('/travels/:id', getTravelById);
router.put('/travels/:id', updateTravel);
router.delete('/travels/:id', deleteTravel);

// Routen zum Hinzufügen und Entfernen von Destinationen zu/von Reisen
router.post('/travels/:travelId/destinations/:destinationId', addDestinationToTravel);
router.delete('/travels/:travelId/destinations/:destinationId', removeDestinationFromTravel);

export default router;
