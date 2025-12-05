import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  dayOrder: { type: Number, required: true }, // 1 to 6
  hours: [
    {
      hour: Number, // 1 to 5
      subject: String,
      className: String,
      room: String,
    },
  ],
});

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  staffId: { type: String, required: true },
  department: { type: String, required: true },

  timetable: [timetableSchema], // 6 day orders with 5 hours each
});

export default mongoose.model("Staff", staffSchema);
