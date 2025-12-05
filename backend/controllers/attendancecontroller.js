// import Attendance from "../models/Attendance.js";

import Attendance from "../models/Attendance.js";
import { calculateStatus } from "../utils/reportUtils.js";
import { generateExcel } from "../utils/exportUtils.js";
const attendance = async (req, res) => {
  try {
    const data = await Attendance.insertMany(req.body);
    // console.log(data);
    return res.status(200).json({ message: "Attendance saved" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error saving", error: err.message });
  }
};

const getattendance = async (req, res) => {
  try {
    const response = await Attendance.find({});
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(400).json({ error: "Error in Fetching Students" });
  }
};

const attendanceupdate = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Helper for aggregation
const baseGroup = {
  _id: "$Reg_no",
  Name: { $first: "$Name" },
  Class: { $first: "$Class" },
  Department: { $first: "$Department" },
  totalPresent: { $sum: { $cond: [{ $eq: ["$Status", "Present"] }, 1, 0] } },
  totalDays: { $sum: 1 },
};

export const getReportByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query; // ISO strings or 'YYYY-MM-DD'

    const match = {
      Date: { $gte: start, $lte: end },
    };

    const result = await Attendance.aggregate([
      { $match: match },
      { $group: baseGroup },
      { $sort: { _id: 1 } },
    ]);

    const final = result.map((r) => ({
      ...r,
      ...calculateStatus(r.totalPresent, r.totalDays),
    }));

    res.json(final);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDailyReport = async (req, res) => {
  const { date } = req.query; // 'YYYY-MM-DD'
  console.log(date);
  try {
    const result = await Attendance.aggregate([
      { $match: { Date: date } },
      { $group: baseGroup },
      { $sort: { _id: 1 } },
    ]);

    const final = result.map((r) => ({
      ...r,
      ...calculateStatus(r.totalPresent, r.totalDays),
    }));

    res.json(final);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyReport = async (req, res) => {
  const { month, year } = req.query; // month: '01'
};

export const getYearlyReport = async (req, res) => {
  const { year } = req.query;
  try {
    const result = await Attendance.aggregate([
      { $match: { Date: { $regex: `^${year}` } } },
      { $group: baseGroup },
      { $sort: { _id: 1 } },
    ]);

    const final = result.map((r) => ({
      ...r,
      ...calculateStatus(r.totalPresent, r.totalDays),
    }));

    res.json(final);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export to Excel endpoint
export const exportReportExcel = async (req, res) => {
  try {
    const { start, end } = req.query;
    const result = await Attendance.aggregate([
      { $match: { Date: { $gte: start, $lte: end } } },
      { $group: baseGroup },
    ]);

    const final = result.map((r) => ({
      Reg_no: r._id,
      Name: r.Name,
      Class: r.Class,
      Department: r.Department,
      totalPresent: r.totalPresent,
      totalDays: r.totalDays,
      ...calculateStatus(r.totalPresent, r.totalDays),
    }));

    const filePath = `./temp/attendance-${Date.now()}.xlsx`;
    await generateExcel(final, filePath);

    res.download(filePath, (err) => {
      if (err) console.error(err);
      try {
        fs.unlinkSync(filePath);
      } catch (e) {}
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Individual student detail (by Reg_no)
export const getStudentDetail = async (req, res) => {
  try {
    const { reg } = req.params;
    const records = await Attendance.find({ Reg_no: reg }).sort({ Date: 1 });
    // Build calendar style response: list of {Date,Status,Subject}
    const calendar = records.map((r) => ({
      Date: r.Date,
      Status: r.Status,
      Subject: r.Subject,
    }));

    const totalPresent = records.filter((r) => r.Status === "Present").length;
    const totalDays = records.length;
    const { percentage, status } = calculateStatus(totalPresent, totalDays);

    res.json({
      Reg_no: reg,
      Name: records[0]?.Name || "",
      Class: records[0]?.Class || "",
      Department: records[0]?.Department || "",
      totalPresent,
      totalDays,
      percentage,
      status,
      calendar,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { attendance, getattendance, attendanceupdate };
