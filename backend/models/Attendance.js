import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  Reg_no: String,
  Name: String,
  Class: String,
  Department: String,
  Status: String,
  Date: String,
  Day: String,
  Subject: String,
  Photo: String,
});

const Attendance =
  mongoose.models.attendance || mongoose.model("Attendance", attendanceSchema);
export default Attendance;
