import express from "express";
import { classes, deleteclass, editclass, getallclasses } from "../controllers/classcontroller.js";
const classrouter = express.Router();

classrouter.post("/addClass", classes);
classrouter.get("/getClasses", getallclasses);
classrouter.put("/edit/:id", editclass);
classrouter.delete("/delete/:id", deleteclass);

export default classrouter;
