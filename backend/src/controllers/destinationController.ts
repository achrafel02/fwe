import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Destination from '../models/Destination';

// Create a new destination
export const createDestination = async (req: Request, res: Response) => {
  try {
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all destinations
export const getDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a destination by ID
export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination ID' });
    }

    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update a destination by ID
export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination ID' });
    }

    if (!name || !description || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const destination = await Destination.findByIdAndUpdate(id, req.body, { new: true });
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete a destination by ID
export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination ID' });
    }

    const destination = await Destination.findByIdAndDelete(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json({ message: 'Destination deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
