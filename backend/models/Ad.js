import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  title: String,
  prix: String,
  description: String,
  ville: String,
  imageUrl: String,
  // disponibilite: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Ad', AdSchema);

