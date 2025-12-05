import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
// This code defines a Mongoose schema and model for an admin user in a MongoDB database.
