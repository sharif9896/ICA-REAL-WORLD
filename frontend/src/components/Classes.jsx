import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/util";
import ClassCard from "./ClassCard";

const classes = ({ department }) => {
  const [classlist, setclasslist] = useState([]);
  const [editDept, setEditDept] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fetchclasses = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}api/admin/classes/getClasses`
      );
      setclasslist(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchclasses();
  }, []);
  const finallist = classlist.filter((val) => {
    return val.department === department;
  });

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

  return (
    <>
      <ClassCard classlists={finallist} />
    </>
  );
};

export default classes;
