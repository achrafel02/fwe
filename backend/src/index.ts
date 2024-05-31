import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import travelRoutes from './routes/travelRoutes';
import destinationRoutes from './routes/destinationRoutes';
import travelDestinationRoutes from './routes/travelDestinationRoutes';
import errorHandler from './middleware/errorHandler';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// MongoDB connection string
const dbUri = process.env.MONGODB_URI;

if (!dbUri) {
  console.error('Error: MONGODB_URI is not defined in the environment variables.');
  process.exit(1); // Exit the process with an error code
}

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use(bodyParser.json());

app.use('/api', travelRoutes);
app.use('/api', destinationRoutes);
app.use('/api', travelDestinationRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
