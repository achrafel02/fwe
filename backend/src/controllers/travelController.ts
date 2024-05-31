import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Travel from '../models/Travel';
import Destination from '../models/Destination';

// Add destination to travel
export const addDestinationToTravel = async (req: Request, res: Response) => {
  try {
    const { travelId, destinationId } = req.params;

    if (!Types.ObjectId.isValid(travelId) || !Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: 'Invalid travel or destination ID' });
    }

    const travel = await Travel.findById(travelId);
    const destination = await Destination.findById(destinationId);
    if (!travel || !destination) {
      return res.status(404).json({ message: 'Travel or Destination not found' });
    }
    travel.destinations.push(new Types.ObjectId(destinationId));  // Hier destinationId in ObjectId umwandeln
    await travel.save();
    res.status(200).json(travel);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Remove destination from travel
export const removeDestinationFromTravel = async (req: Request, res: Response) => {
  try {
    const { travelId, destinationId } = req.params;

    if (!Types.ObjectId.isValid(travelId) || !Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: 'Invalid travel or destination ID' });
    }

    const travel = await Travel.findById(travelId);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    const destinationObjectId = new Types.ObjectId(destinationId);  // Hier destinationId in ObjectId umwandeln
    const destinationIndex = travel.destinations.indexOf(destinationObjectId);
    if (destinationIndex > -1) {
      travel.destinations.splice(destinationIndex, 1);
    }
    await travel.save();
    res.status(200).json(travel);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Create a new travel
export const createTravel = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate } = req.body;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const travel = new Travel(req.body);
    await travel.save();
    res.status(201).json(travel);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all travels
export const getTravels = async (req: Request, res: Response) => {
  try {
    const travels = await Travel.find();
    res.status(200).json(travels);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a travel by ID
export const getTravelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid travel ID' });
    }

    const travel = await Travel.findById(id);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    res.status(200).json(travel);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update a travel by ID
export const updateTravel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid travel ID' });
    }

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const travel = await Travel.findByIdAndUpdate(id, req.body, { new: true });
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    res.status(200).json(travel);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete a travel by ID
export const deleteTravel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid travel ID' });
    }

    const travel = await Travel.findByIdAndDelete(id);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    res.status(200).json({ message: 'Travel deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Search travels by name or date
export const searchTravels = async (req: Request, res: Response) => {
  const { name, startDate, endDate } = req.query;
  const query: any = {};

  if (name) {
    query.name = { $regex: name as string, $options: 'i' };
  }

  if (startDate && endDate) {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    query.startDate = { $gte: start };
    query.endDate = { $lte: end };
  }

  try {
    const travels = await Travel.find(query);
    res.status(200).json(travels);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};