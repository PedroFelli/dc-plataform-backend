import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id?: string;
  email: string;
  name: string;
  password: string;
}

export type ToolDocument = IUser & Document;

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
});

export default mongoose.model<IUser>('User', userSchema);
