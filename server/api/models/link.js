import mongoose from 'mongoose';

var linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
	required: true
  },
  vote: {
	type: Number,
	default: 0
  },
  favorite: {
	 type: Boolean,
	 default: false
  }
});

export default mongoose.model('Link', linkSchema);
