import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/util";
import ClassCard from "./ClassCard";
import StudentCards from "./StudentCards";
import AttendanceList from "./AttendanceList";

const Thirdyear_AT = ({ thirdyear, department }) => {
  //   console.log(Thirdyear_AT, department);
  const [classlist, setclasslist] = useState([]);
  const [editDept, setEditDept] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fetchclasses = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}api/attendance/fetchattendance`
      );
      setclasslist(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchclasses();
  }, []);

  //   console.log();
  const finallist = classlist.filter((val) => {
    return val.Class === thirdyear && val.Department === department;
  });
  //   console.log(finallist);

  const handleEdit = (dept) => setEditDept(dept);
  const handleDelete = (dept) => setConfirmDelete(dept);

  const saveEdit = () => {
    setclasslist((prev) =>
      prev.map((d) => (d._id === editDept._id ? editDept : d))
    );
    setEditDept(null);
  };

  const confirmDeleteAction = () => {
    setclasslist((prev) => prev.filter((d) => d.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  return <>{<AttendanceList classlists={finallist} />}</>;
};

export default Thirdyear_AT;
