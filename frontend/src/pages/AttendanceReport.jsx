// src/components/AttendanceReport.jsx
import React, { useEffect, useState, useRef } from "react";
import { BACKEND_URL } from "../../utils/util";

/**
 * Props: none required. Assumes your app proxies /api to backend (or use full URL).
 */
export default function AttendanceReport() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalWorkingDays, setTotalWorkingDays] = useState(null);

  // filters
  const [from, setFrom] = useState(""); // format YYYY-MM-DD
  const [to, setTo] = useState("");
  const [ClassFilter, setClassFilter] = useState("");
  const [DepartmentFilter, setDepartmentFilter] = useState("");
  const [denom, setDenom] = useState("global"); // global or per-student

  useEffect(() => {
    fetch(`${BACKEND_URL}api/attendance/summary`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (ClassFilter) params.append("Class", ClassFilter);
    if (DepartmentFilter) params.append("Department", DepartmentFilter);
    if (denom) params.append("denom", denom);
    return params.toString();
  };

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const q = buildQuery();
  //     const res = await fetch(`${BACKEND_URL}api/attendance/summary`);
  //     const json = await res.json();
  //     setData(json.data || []);
  //     setTotalWorkingDays(json.totalWorkingDays || null);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to fetch attendance summary");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Export displayed data to CSV client-side
  const exportCsv = () => {
    if (!data.length) return alert("No data to export");
    const headers = [
      "Reg_no",
      "Name",
      "Class",
      "Department",
      "Present",
      "Denominator",
      "Percentage",
      "Remark",
    ];
    const rows = data.map((d) => [
      d.Reg_no,
      d.Name,
      d.Class,
      d.Department,
      d.presentDays,
      d.denominator,
      d.percentage,
      d.remark,
    ]);
    let csvContent =
      headers.join(",") +
      "\n" +
      rows
        .map((r) => r.map((c) => `"${("" + c).replace(/"/g, '""')}"`).join(","))
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_summary.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const badgeColor = (remark) => {
    switch (remark) {
      case "REDO":
        return "bg-red-600";
      case "DETAIN":
        return "bg-orange-500";
      case "SHORTAGE":
        return "bg-yellow-500";
      default:
        return "bg-green-600";
    }
  };
  // Open separate window with printable content and call print
  const printTable = () => {
    if (!data.length) return alert("No data to print");
    // Build a printable HTML string
    const style = `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 10px; border: 1px solid #ddd; text-align: center; }
        th { background: #1f2937; color: white; }
        img { width: 40px; height: 40px; object-fit: cover; border-radius: 50%; }
        .meta { margin-bottom: 12px; }
      </style>
    `;
    const headerHtml = `<div class="meta"><h2>Attendance Summary Report</h2>
      <div>Filters: ${from ? `From: ${from}` : "From: -"} | ${
      to ? `To: ${to}` : "To: -"
    } | Denom: ${denom}</div>
      <div>Total Working Days (global): ${
        totalWorkingDays !== null ? totalWorkingDays : "-"
      }</div>
      <hr /></div>`;

    const rowsHtml = data
      .map(
        (d) => `
      <tr>
        <td>${d.Photo ? `<img src="${d.Photo}" />` : ""}</td>
        <td>${d.Reg_no}</td>
        <td>${d.Name}</td>
        <td>${d.Class || ""}</td>
        <td>${d.Department || ""}</td>
         <td className="p-3">${d.presentDays}</td>
                <td >${d.totalDays}</td>
                <td >${d.percentage}%</td>

                <td>
                  <span
                    className=${`text-white px-3 py-1 rounded-full text-sm font-bold ${badgeColor(
                      d.remark
                    )}`}
                  >
                    ${d.remark}
                  </span>
                </td>
      </tr>
    `
      )
      .join("");

    const tableHtml = `
      <table>
        <thead>
          <tr>
              <th className="p-2">Photo</th>
              <th className="p-2">Reg No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Department</th>
              <th className="p-2">Present</th>
              <th className="p-2">Total</th>
              <th className="p-2">% Attendance</th>
              <th className="p-2">Remark</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    const win = window.open("", "_blank", "width=1000,height=800");
    if (!win) return alert("Popup blocked. Allow popups to print.");
    win.document.write(
      `<!doctype html><html><head><title>Print - Attendance</title>${style}</head><body>${headerHtml}${tableHtml}</body></html>`
    );
    win.document.close();
    // Wait for images & fonts to load before printing
    win.focus();
    // Small timeout to ensure render (usually fine). It's a single-shot print call inside opened window.
    setTimeout(() => {
      win.print();
      // Optionally close after print:
      // win.close();
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Attendance Report</h1>

      <div className="bg-white p-4 rounded-md shadow mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-sm">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Class</label>
            <input
              placeholder="e.g. BSc-3"
              value={ClassFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Department</label>
            <input
              placeholder="e.g. Computer Science"
              value={DepartmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Denominator</label>
            <select
              value={denom}
              onChange={(e) => setDenom(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="global">Global (same working days)</option>
              <option value="per-student">
                Per-student (their own records)
              </option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              // onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setFrom("");
                setTo("");
                setClassFilter("");
                setDepartmentFilter("");
                setDenom("global");
                // fetchData();
              }}
              className="border px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>

          <div className="ml-auto flex gap-2">
            <button
              onClick={exportCsv}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Export CSV
            </button>
            <button
              onClick={printTable}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Photo</th>
              <th className="p-2">Reg No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Department</th>
              <th className="p-2">Present</th>
              <th className="p-2">Total</th>
              <th className="p-2">% Attendance</th>
              <th className="p-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((s) => (
                <tr key={s.Reg_no} className="border-b text-center">
                  <td className="p-2">
                    {s.Photo ? (
                      <img
                        src={s.Photo}
                        alt=""
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2">{s.Reg_no}</td>
                  <td className="p-2">{s.Name}</td>
                  <td className="p-2">{s.Class}</td>
                  <td className="p-2">{s.Department}</td>
                  <td className="p-3">{s.presentDays}</td>
                  <td className="p-3">{s.totalDays}</td>
                  <td className="p-3 font-bold">{s.percentage}%</td>

                  <td className="p-3">
                    <span
                      className={`text-white px-3 py-1 rounded-full text-sm font-bold ${badgeColor(
                        s.remark
                      )}`}
                    >
                      {s.remark}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        {denom === "global"
          ? `Global working days in selected range: ${totalWorkingDays ?? "-"}`
          : "Denominator = per-student records"}
      </div>
    </div>
  );
}
