import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../../frontend/utils/util";

const ExportButtons = () => {
  const handleExport = async () => {
    try {
      await axios.get(`${BACKEND_URL}api/export/export`);
      toast.success("Data exported successfully!");
    } catch {
      toast.error("Failed to export");
    }
  };

  const handleDownload = (type) => {
    window.open(`/exports/attendance.${type}`, "_blank");
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Export to Excel & PDF
      </button>
      <button
        onClick={() => handleDownload("xlsx")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Excel
      </button>
      <button
        onClick={() => handleDownload("pdf")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ExportButtons;
