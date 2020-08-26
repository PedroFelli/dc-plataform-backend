import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
  id?: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export type ToolDocument = ITool & Document;

const toolSchema: Schema = new mongoose.Schema({
  title: {
    trim: true,
    required: true,
    type: String,
    index: true,
  },
  link: {
    trim: true,
    index: true,
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  tags: { type: [String] }, // field level
});

export default mongoose.model<ITool>('Tool', toolSchema);
