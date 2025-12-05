import Student from "../models/studentModel.js";
import { v2 as cloudinary } from "cloudinary";

const getstudents = async (req, res) => {
  try {
    const response = await Student.find({});
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(400).json({ error: "Error in Fetching Students" });
  }
};

const createStudent = async (req, res) => {
  try {
    const {
      Reg_no,
      Name,
      Email,
      DOB,
      Class,
      Department,
      Address,
      Phone,
      ParentName,
      ParentPhone,
      Adhar,
      BloodGroup,
      Batch,
      BankAccount,
      BankName,
    } = req.body;
    const newStudent = new Student({
      Reg_no,
      Name,
      Email,
      DOB,
      Class,
      Department,
      Address,
      Phone,
      ParentName,
      ParentPhone,
      Adhar,
      BloodGroup,
      Batch,
      BankAccount,
      BankName,
    });

    if (
      !Reg_no ||
      !Name ||
      !Email ||
      !DOB ||
      !Class ||
      !Department ||
      !Address ||
      !Phone ||
      !ParentName ||
      !ParentPhone ||
      !Adhar ||
      !BloodGroup ||
      !Batch ||
      !BankAccount ||
      !BankName
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await newStudent.save();
    return res
      .status(201)
      .json({ message: "Student created successfully", student: result });
  } catch (error) {
    return res.status(500).json({ error: "Error in creating student" });
  }
};

const editstu = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Reg_no,
      Name,
      Email,
      DOB,
      Class,
      Department,
      Address,
      Phone,
      ParentName,
      ParentPhone,
      Adhar,
      BloodGroup,
      Batch,
      BankAccount,
      BankName,
    } = req.body;
    const updatedata = {
      Reg_no,
      Name,
      Email,
      DOB,
      Class,
      Department,
      Address,
      Phone,
      ParentName,
      ParentPhone,
      Adhar,
      BloodGroup,
      Batch,
      BankAccount,
      BankName,
    };
    const result = await Student.findByIdAndUpdate({ _id: id }, updatedata);
    return res.status(200).json({ message: "Updated Successfully..", result });
  } catch (error) {
    console.log("Error in updating!");
    return res.status(401).json({ error: "Error in Updating!" });
  }
};

const deletestiu = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Deleted Successfully..", deleted });
  } catch (error) {
    console.log("Error in deleting!");
    return res.status(401).json({ error: "Error in Deleting!" });
  }
};

export { getstudents, createStudent, editstu, deletestiu };
