import express from "express";
import Staff from "../models/staff.model.js";
import { login } from "../controllers/Staffcontroller.js";

const router = express.Router();

// CREATE STAFF WITH TIMETABLE
router.post("/add", async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.json({ message: "Staff added", staff });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", login);

// GET ALL STAFF
router.get("/all", async (req, res) => {
  const staff = await Staff.find();
  res.json(staff);
});

// GET SINGLE STAFF TIMETABLE
router.get("/:id/timetable", async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  res.json(staff.timetable);
});

export default router;
