import express from "express";
import {
  editstu,
  createStudent,
  getstudents,
  deletestiu,
} from "../controllers/studentcontroller.js";
const studentsrouter = express.Router();

// studentsrouter.post("/addstudents", studentses);
studentsrouter.get("/getstudents", getstudents);
studentsrouter.post("/addstudents", createStudent);
studentsrouter.put("/:id", editstu);
studentsrouter.delete("/:id", deletestiu);

export default studentsrouter;
