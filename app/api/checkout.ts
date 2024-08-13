import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import TimeEntry from '../../models/TimeEntry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await mongoose.connect(process.env.MONGO_URI || '');

    const { checkOutTime, timeDuration } = req.body;
    const entry = await TimeEntry.findOne().sort({ createdAt: -1 });
    if (entry) {
      entry.checkOutTime = checkOutTime;
      entry.timeDuration = timeDuration;
      await entry.save();

      res.status(200).json(entry);
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
