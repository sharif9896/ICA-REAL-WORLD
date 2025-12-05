import classModel from "../models/classModel.js";

const classes = async (req, res) => {
  const { firstyear, secondyear, thirdyear, department } = req.body;
  try {
    if (!firstyear || !secondyear || !thirdyear || !department) {
      return res.status(400).json({ error: "Please fill all fields!" });
    }
    const departmentdb = await classModel.find({ department });
    if (!departmentdb) {
      return res
        .status(401)
        .json({ error: "Class or Department is already exists.." });
    }
    const classObj = {
      firstyear,
      secondyear,
      thirdyear,
      department,
    };
    const data = await classModel.create(classObj);
    return res
      .status(200)
      .json({ success: true, message: "Class Created Sucessfully!", data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error in Class Entry!" });
  }
};

const getallclasses = async (req, res) => {
  try {
    const data = await classModel.find({});
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(401).json({ error: "Error in getting classes!" });
  }
};

const editclass = async (req, res) => {
  try {
    const { id } = req.prams;
    const { firstyear, secondyear, thirdyear, department } = req.body;
    const updatedata = {
      firstyear,
      secondyear,
      thirdyear,
      department,
    };
    const result = await classModel.updateOne({ _id: id }, updatedata);
    return res.status(200).json({ message: "Updated Successfully..", result });
  } catch (error) {
    console.log("Error in updating!");
    return res.status(401).json({ error: "Error in Updating!" });
  }
};

const deleteclass = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteddata = await classModel.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ message: "Deleted Successfully..", deleteddata });
  } catch (error) {
    console.log("Error in deleting!");
    return res.status(401).json({ error: "Error in Deleting!" });
  }
};

export { classes, getallclasses, editclass, deleteclass };
