import Staff from "../models/staff.model.js";
const login = async (req, res) => {
  const { name, staffId } = req.body;
  try {
    const user = await Staff.find({ staffId });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Error in staff login" });
  }
};

export { login };
