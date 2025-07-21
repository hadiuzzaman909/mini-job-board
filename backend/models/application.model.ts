import { Schema, model } from 'mongoose';
import { IApplication } from './types/application.interface';

const AddressSchema = new Schema<IApplication['applicantAddress']>({
  street:  { type: String, required: true },
  city:    { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const ApplicationSchema = new Schema<IApplication>({
  jobId:             { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  name:              { type: String, required: true },
  email:             { type: String, required: true, lowercase: true, match: [/\S+@\S+\.\S+/, 'Invalid email'] },
  cvLink:            { type: String, required: true, match: [/^https?:\/\/.+/, 'Invalid URL'] },
  phoneNumber:       { type: String, required: true, match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'] },
  coverLetter:       { type: String, required: true, maxlength: [5000, 'Too long'] },
  applicantAddress:  { type: AddressSchema, required: true },
  applicationStatus: { type: String, enum: ['Pending','Under Review','Accepted','Rejected'], default: 'Pending' },
}, {
  timestamps: true
});

ApplicationSchema.index({ jobId: 1, email: 1 });
ApplicationSchema.index({ applicationStatus: 1 });

export const ApplicationModel = model<IApplication>('Application', ApplicationSchema);