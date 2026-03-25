import mongoose from 'mongoose';

const flowDataSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true
  },
  response: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('FlowData', flowDataSchema);
