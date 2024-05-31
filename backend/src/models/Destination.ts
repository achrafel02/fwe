import mongoose, { Schema, Document } from 'mongoose';

interface Destination extends Document {
  name: string;
  travels: mongoose.Types.ObjectId[];
}

const destinationSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  travels: [{ type: Schema.Types.ObjectId, ref: 'Travel' }]
});

export default mongoose.model<Destination>('Destination', destinationSchema);
