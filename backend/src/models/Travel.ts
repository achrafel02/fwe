import mongoose, { Schema, Document } from 'mongoose';

interface ITravel extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: string[];
  image: string;
  destinations: mongoose.Types.ObjectId[];
}

const TravelSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: { type: [String], required: true, validate: [arrayLimit, '{PATH} exceeds the limit of 10'] },
  image: { type: String, required: true },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }]
});

// Custom validator for participants array
function arrayLimit(val: string[]) {
  return val.length <= 10;
}

export default mongoose.model<ITravel>('Travel', TravelSchema);
