import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import TimeEntry from '../../models/TimeEntry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await mongoose.connect(process.env.MONGO_URI || '');

    const { checkInTime } = req.body;
    const newEntry = new TimeEntry({ checkInTime });
    await newEntry.save();

    res.status(201).json(newEntry);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
