import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  firstyear: { type: String, required: true },
  secondyear: { type: String, required: true },
  thirdyear: { type: String, required: true },
  department: { type: String, required: true },
});
const classModel = mongoose.models.class || mongoose.model("class", Schema);
export default classModel;
