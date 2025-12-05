import Attendance from "../models/Attendance.js";

export const getAttendanceSummary = async (req, res) => {
  try {
    // Group attendance by student Reg_no
    const summary = await Attendance.aggregate([
      {
        $group: {
          _id: "$Reg_no",
          Name: { $first: "$Name" },
          Class: { $first: "$Class" },
          Department: { $first: "$Department" },
          Photo: { $first: "$Photo" },

          totalDays: { $sum: 1 },
          presentDays: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Present"] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Add percentage + status logic
    const final = summary.map((s) => {
      const percentage = ((s.presentDays / s.totalDays) * 100).toFixed(2);

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
        totalDays: s.totalDays,
        presentDays: s.presentDays,
        percentage,
        remark,
      };
    });

    res.json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
