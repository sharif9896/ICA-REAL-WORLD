import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  staffId: { type: String, required: true },
});

const user = mongoose.model("User", userSchema);

export default user;
