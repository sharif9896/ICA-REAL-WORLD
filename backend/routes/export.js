import express from "express";
import path from "path";
import { exec } from "child_process";
const exportrouter = express.Router();

exportrouter.get("/export", (req, res) => {
  const scriptPath = path.join(__dirname, "../scripts/export_attendance.py");

  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Export error:", error);
      return res.status(500).json({ message: "Export failed", error });
    }
    res.json({ message: "Export completed" });
  });
});

export default exportrouter;
