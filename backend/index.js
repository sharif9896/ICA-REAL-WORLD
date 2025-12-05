import express from "express";
import "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import mongodb from "./config/mongodb.js";
import cloudinaryfunc from "./config/cloudinary.js";
import adminrouter from "./routes/adminroutes.js";
import Student from "./models/studentModel.js";
import xl from "excel4node";
import fs from "fs";
import classrouter from "./routes/classroutes.js";
import departmentrouter from "./routes/departmentroutes.js";
import studentsrouter from "./routes/studentsroutes.js";
import imageMatchRoute from "./routes/imageMatch.js";
import attendancerouter from "./routes/attendanceroutes.js";
import webhookRouter from "./routes/webhooks.js";
import staffRoutes from "./routes/staff.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
// import staffrouter from "./routes/staffRoutes.js";

const app = express();

// APP CONFIG
const PORT = process.env.PORT || 1956;
mongodb();
cloudinaryfunc();

// MIDDLEWARE
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use(cors());

app.use("/api/staff", staffRoutes);

app.use(errorHandler);
// export & import

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async (req, res) => {
  try {
    const students = req.body.students;
    await Student.insertMany(students);
    res.json({ message: "Students inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// const xl = require("excel4node");
// const fs = require("fs");

app.get("/export", async (req, res) => {
  try {
    const students = await Student.find();

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Students");

    [
      "Reg_no",
      "Name",
      "Email",
      "DOB",
      "Class",
      "Department",
      "Address",
      "Phone",
      "ParentName",
      "ParentPhone",
      "Adhar",
      "BloodGroup",
      "Batch",
      "BankAccount",
      "BankName",
    ].forEach((header, i) => {
      ws.cell(1, i + 1).string(header);
    });

    students.forEach((student, row) => {
      ws.cell(row + 2, 1).string(student.Reg_no);
      ws.cell(row + 2, 2).string(student.Name);
      ws.cell(row + 2, 3).string(student.Email);
      ws.cell(row + 2, 5).string(student.DOB);
      ws.cell(row + 2, 6).string(student.Class);
      ws.cell(row + 2, 7).string(student.Department);
      ws.cell(row + 2, 8).string(student.Address);
      ws.cell(row + 2, 9).number(student.Phone);
      ws.cell(row + 2, 10).string(student.ParentName);
      ws.cell(row + 2, 11).number(student.ParentPhone);
      ws.cell(row + 2, 12).string(student.Adhar);
      ws.cell(row + 2, 13).string(student.BloodGroup);
      ws.cell(row + 2, 14).string(student.Batch);
      ws.cell(row + 2, 15).string(student.BankAccount);
      ws.cell(row + 2, 16).string(student.BankName);
    });

    const filePath = "./Students.xlsx";
    wb.write(filePath, async () => {
      const stream = fs.createReadStream(filePath);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Students.xlsx"
      );
      stream.pipe(res);
    });
  } catch (error) {
    console.error("Export Error:", error);
    res
      .status(500)
      .json({ message: "Failed to export students", error: error.message });
  }
});

// Clear all students
app.delete("/clear", async (req, res) => {
  try {
    await Student.deleteMany({});
    res.json({ message: "All student data cleared!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear student data" });
  }
});

// API ENDPOINTS
app.use("/api/admin", adminrouter);
app.use("/api/admin/classes", classrouter);
app.use("/api/admin/departments", departmentrouter);
app.use("/api/admin/students", studentsrouter);
app.use("/api/images", imageMatchRoute);
app.use("/api/attendance", attendancerouter);
app.use("/api/webhooks", webhookRouter);
// app.use("/api/staffs", staffrouter);

app.get("/", (req, res) => {
  res.send("API is Running");
});
app.listen(PORT, () => {
  console.log(`Server is Started at Port : localhost:${PORT}`);
});
