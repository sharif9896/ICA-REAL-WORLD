import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  Reg_no: String,
  Name: String,
  Email: String,
  DOB: String,
  Class: String,
  Department: String,
  Address: String,
  Phone: Number,
  ParentName: String,
  ParentPhone: Number,
  Adhar: String,
  BloodGroup: String,
  Batch: String,
  BankAccount: String,
  BankName: String,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
