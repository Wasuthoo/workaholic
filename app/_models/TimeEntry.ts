import mongoose, { Document, Schema, Model } from 'mongoose';

interface ITimeEntry extends Document {
  checkInTime: Date;
  checkOutTime?: Date;
  timeDuration?: string;
}

const TimeEntrySchema = new Schema<ITimeEntry>({
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date },
  timeDuration: { type: String },
});

const TimeEntry: Model<ITimeEntry> = mongoose.models.TimeEntry || mongoose.model<ITimeEntry>('TimeEntry', TimeEntrySchema);

export default TimeEntry;
