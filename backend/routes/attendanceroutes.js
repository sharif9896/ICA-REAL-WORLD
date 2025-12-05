import express from "express";
import {
  attendance,
  attendanceupdate,
  getattendance,
} from "../controllers/attendancecontroller.js";
import Attendance from "../models/Attendance.js";
import { getAttendanceSummary } from "../controllers/attendanceSummaryController.js";
import { attendanceReport, exportAttendanceCsv } from "../controllers/attendanceReportController.js";
const attendancerouter = express.Router();

attendancerouter.post("/attendance", attendance);
attendancerouter.get("/fetchattendance", getattendance);
attendancerouter.put("/updateattendance/:id", attendanceupdate);

attendancerouter.get("/summary", getAttendanceSummary);
attendancerouter.get("/report", attendanceReport);
attendancerouter.get("/export/csv", exportAttendanceCsv);
// Auto Attendance Calculation API
attendancerouter.get("/stats/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;

    // 1. Get all attendance records of the student
    const records = await Attendance.find({ Reg_no: regNo });

    if (records.length === 0) {
      return res.status(404).json({ message: "No attendance found" });
    }

    // 2. Total working days = total records
    const totalWorkingDays = records.length;

    // 3. Count present days
    const presentDays = records.filter((r) => r.Status === "Present").length;

    // 4. Calculate percentage
    const attendancePercentage = Number(
      ((presentDays / totalWorkingDays) * 100).toFixed(2)
    );

    // 5. Generate status based on rules
    let status = "";
    if (attendancePercentage < 55) status = "REDO";
    else if (attendancePercentage < 65) status = "DETAIN";
    else status = "SHORTAGE CLEARED";

    res.json({
      Reg_no: regNo,
      presentDays,
      totalWorkingDays,
      attendancePercentage,
      status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default attendancerouter;
