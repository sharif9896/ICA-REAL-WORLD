import departModel from "../models/department.js";

const departments = async (req, res) => {
  const { className, department } = req.body;
  // console.log(className, department);
  try {
    if (!className || !department) {
      return res.status(400).json({ error: "Please fill all fields!" });
    }
    const departmentdb = await departModel.find({ department });
    if (!departmentdb) {
      return res
        .status(401)
        .json({ error: "Class or Department is already exists.." });
    }
    const classObj = {
      className,
      department,
    };
    const data = await departModel.create(classObj);
    return res.status(200).json({
      success: true,
      message: "Department Created Sucessfully!",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error in Department Entry!" });
  }
};

const getalldepartments = async (req, res) => {
  try {
    const data = await departModel.find({});
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(401).json({ error: "Error in getting departments!" });
  }
};

const editdepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { className, department } = req.body;
    const updatedata = {
      className,
      department,
    };
    const result = await departModel.updateOne({ _id: id }, updatedata);
    return res.status(200).json({ message: "Updated Successfully..", result });
  } catch (error) {
    console.log("Error in updating!");
    return res.status(401).json({ error: "Error in Updating!" });
  }
};

const deletedepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteddata = await departModel.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ message: "Deleted Successfully..", deleteddata });
  } catch (error) {
    console.log("Error in deleting!");
    return res.status(401).json({ error: "Error in Deleting!" });
  }
};

export { departments, getalldepartments, editdepartment, deletedepartment };
