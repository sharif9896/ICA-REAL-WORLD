// controllers/attendanceReportController.js
import mongoose from "mongoose";
import { Parser } from "json2csv"; // optional for CSV export endpoint
// controllers/attendanceReportController.js
import Attendance from "../models/Attendance.js";

const parseDateRange = (from, to) => {
  const range = {};
  if (from) range.$gte = new Date(from);
  if (to) range.$lte = new Date(to);
  return range;
};

export const attendanceReport = async (req, res) => {
  try {
    const { from, to, Class, Department, denom = "global" } = req.query;
      console.log(from, to, Class, Department, denom);
    const match = {};
    if (from || to) match.Date = parseDateRange(from, to);
    if (Class) match.Class = Class;
    if (Department) match.Department = Department;

    // GLOBAL WORKING DAYS
    let totalWorkingDays = 0;
    if (denom === "global") {
      const dates = await Attendance.aggregate([
        { $match: match },
        { $group: { _id: "$Date" } },
        { $count: "count" },
      ]);
      totalWorkingDays = dates.length ? dates[0].count : 0;
    }

    const summary = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$Reg_no",
          Name: { $first: "$Name" },
          Class: { $first: "$Class" },
          Department: { $first: "$Department" },
          Photo: { $first: "$Photo" },
          presentDays: {
            $sum: { $cond: [{ $eq: ["$Status", "Present"] }, 1, 0] },
          },
          totalDays: { $sum: 1 },
        },
      },
    ]);
    console.log(summary);
    const final = summary.map((s) => {
      const denominator = denom === "global" ? totalWorkingDays : s.totalDays;

      const percentage =
        denominator > 0 ? ((s.presentDays / denominator) * 100).toFixed(2) : 0;

      let remark = "CLEAR";
      if (percentage <= 55) remark = "REDO";
      else if (percentage <= 65) remark = "DETAIN";
      else if (percentage < 75) remark = "SHORTAGE";

      return {
        Reg_no: s._id,
        Name: s.Name,
        Class: s.Class,
        Department: s.Department,
        Photo: s.Photo,
        present: s.presentDays,
        total: denominator,
        percentage,
        remark,
      };
    });

    console.log(final);

    res.json({
      workingDays: denom === "global" ? totalWorkingDays : null,
      data: final,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Optional: a fast CSV export endpoint (server-side) if you want CSV from server
export const exportAttendanceCsv = async (req, res) => {
  try {
    req.query.denom = req.query.denom || "global";
    const result = await getAttendanceSummaryRawForExport(req.query); // you can refactor using same aggregation
    const fields = [
      "Reg_no",
      "Name",
      "Class",
      "Department",
      "presentDays",
      "denominator",
      "percentage",
      "remark",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(result);
    res.header("Content-Type", "text/csv");
    res.attachment("attendance_summary.csv");
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send("Export failed");
  }
};

// If you want, implement helper getAttendanceSummaryRawForExport to reuse aggregation logic above.
