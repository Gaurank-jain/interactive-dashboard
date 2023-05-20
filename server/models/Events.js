import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  events: [{
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    }
  }]
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
