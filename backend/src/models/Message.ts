import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  recipient: string;
  content: string;
  author: string;
  messageNumber: number;
  liked: boolean;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  recipient: {
    type: String,
    required: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 500,
  },
  author: {
    type: String,
    required: true,
  },
  messageNumber: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IMessage>('Message', MessageSchema);