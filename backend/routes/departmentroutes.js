import express from "express";
import { deletedepartment, departments, editdepartment, getalldepartments } from "../controllers/departmetcontroller.js";
const departmentrouter = express.Router();

departmentrouter.post("/addDepartment", departments);
departmentrouter.get("/departmentslist", getalldepartments);
departmentrouter.put("/edit/:id", editdepartment);
departmentrouter.delete("/delete/:id", deletedepartment);

export default departmentrouter;
