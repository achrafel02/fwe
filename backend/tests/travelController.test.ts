import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import Travel from '../src/models/Travel';
import Destination from '../src/models/Destination';

describe('Travel Controller Tests', () => {
  beforeAll(async () => {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  afterAll(async () => {
    // Disconnect MongoDB
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the database
    await Travel.deleteMany({});
    await Destination.deleteMany({});
  });

  it('should create a new travel', async () => {
    const newTravel = {
      name: 'Test Travel',
      description: 'Test Description',
      startDate: '2024-05-25',
      endDate: '2024-06-05',
      participants: ['John Doe', 'Jane Doe'],
      image: 'test.jpg'
    };

    const response = await request(app)
      .post('/api/travels')
      .send(newTravel)
      .expect(201);

    expect(response.body).toMatchObject(newTravel);
  });

  it('should get all travels', async () => {
    const travels = [
      {
        name: 'Travel 1',
        description: 'Description 1',
        startDate: '2024-05-20',
        endDate: '2024-05-30',
        participants: ['John Doe'],
        image: 'image1.jpg'
      },
      {
        name: 'Travel 2',
        description: 'Description 2',
        startDate: '2024-06-10',
        endDate: '2024-06-20',
        participants: ['Jane Doe'],
        image: 'image2.jpg'
      }
    ];

    await Travel.create(travels);

    const response = await request(app)
      .get('/api/travels')
      .expect(200);

    expect(response.body).toHaveLength(2);
  });

  it('should get a travel by ID', async () => {
    const newTravel = {
      name: 'Test Travel',
      description: 'Test Description',
      startDate: '2024-05-25',
      endDate: '2024-06-05',
      participants: ['John Doe', 'Jane Doe'],
      image: 'test.jpg'
    };

    const createdTravel = await Travel.create(newTravel);

    const response = await request(app)
      .get(`/api/travels/${createdTravel._id}`)
      .expect(200);

    expect(response.body).toMatchObject(newTravel);
  });

  it('should update a travel by ID', async () => {
    const newTravel = {
      name: 'Test Travel',
      description: 'Test Description',
      startDate: '2024-05-25',
      endDate: '2024-06-05',
      participants: ['John Doe', 'Jane Doe'],
      image: 'test.jpg'
    };

    const createdTravel = await Travel.create(newTravel);

    const updatedTravel = {
      ...newTravel,
      name: 'Updated Test Travel',
      description: 'Updated Test Description'
    };

    const response = await request(app)
      .put(`/api/travels/${createdTravel._id}`)
      .send(updatedTravel)
      .expect(200);

    expect(response.body).toMatchObject(updatedTravel);
  });

  it('should delete a travel by ID', async () => {
    const newTravel = {
      name: 'Test Travel',
      description: 'Test Description',
      startDate: '2024-05-25',
      endDate: '2024-06-05',
      participants: ['John Doe', 'Jane Doe'],
      image: 'test.jpg'
    };

    const createdTravel = await Travel.create(newTravel);

    const response = await request(app)
      .delete(`/api/travels/${createdTravel._id}`)
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Travel deleted');
  });

  it('should search travels by name and date', async () => {
    const travels = [
      {
        name: 'Travel 1',
        description: 'Description 1',
        startDate: '2024-05-20',
        endDate: '2024-05-30',
        participants: ['John Doe'],
        image: 'image1.jpg'
      },
      {
        name: 'Travel 2',
        description: 'Description 2',
        startDate: '2024-06-10',
        endDate: '2024-06-20',
        participants: ['Jane Doe'],
        image: 'image2.jpg'
      }
    ];