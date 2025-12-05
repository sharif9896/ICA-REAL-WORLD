import adminModel from "../models/adminmodel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import classModel from "../models/classModel.js";
import departModel from "../models/department.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // Here you would typically handle the signup logic, such as saving the user to a database
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // console.log(firstname, lastname, email, password)
  const userSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 char long" }),
  });

  const validateData = userSchema.safeParse(req.body);

  if (!validateData.success) {
    return res
      .status(400)
      .json({ error: validateData.error.issues.map((err) => err.message) });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    // Check if the user already exists
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid Email!" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Enter a Strong Password!" });
    }
    const newUser = {
      name,
      email,
      password: hashpassword, // In a real application, make sure to hash the password before saving
    };
    // Simulate saving to a database
    const adminuser = await adminModel.create(newUser);
    res.status(201).json({
      message: "User signed up successfully",
      adminuser,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // In a real application, you would return the created user or some relevant data
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Check if the user exists
    const user = await adminModel.find({ email });
    if (!user || user.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user[0]._id, email: user[0].email },
      config.JWT_ADMINKEY,
      { expiresIn: "1d" }
    );
    // If login is successful, you can return a success message or user data
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout Sucessfully.." });
  } catch (e) {
    return res.status(500).json({ error: "Error in logout!" });
  }
};




export { signup, login, logout};
