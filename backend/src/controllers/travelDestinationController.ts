import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Travel from '../models/Travel';
import Destination from '../models/Destination';

// Add destination to travel
export const addDestinationToTravel = async (req: Request, res: Response) => {
  try {
    const { travelId, destinationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(travelId) || !mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: 'Invalid travel or destination ID' });
    }

    const travel = await Travel.findById(travelId);
    const destination = await Destination.findById(destinationId);
    if (!travel || !destination) {
      return res.status(404).json({ message: 'Travel or Destination not found' });
    }
    travel.destinations.push(new mongoose.Types.ObjectId(destinationId));  // Hier destinationId in ObjectId umwandeln
    await travel.save();
    res.status(200).json(travel);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Remove destination from travel
export const removeDestinationFromTravel = async (req: Request, res: Response) => {
  try {
    const { travelId, destinationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(travelId) || !mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: 'Invalid travel or destination ID' });
    }

    const travel = await Travel.findById(travelId);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    const destinationObjectId = new mongoose.Types.ObjectId(destinationId);  // Hier destinationId in ObjectId umwandeln
    const destinationIndex = travel.destinations.indexOf(destinationObjectId);
    if (destinationIndex > -1) {
      travel.destinations.splice(destinationIndex, 1);
    }
    await travel.save();
    res.status(200).json(travel);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
