import React from 'react'

export default function AttendanceTable({ data=[] }){
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Reg No</th>
          <th className="p-2">Name</th>
          <th className="p-2">Class</th>
          <th className="p-2">Department</th>
          <th className="p-2">Present</th>
          <th className="p-2">Working Days</th>
          <th className="p-2">%</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s,i)=> (
          <tr key={i} className="text-center border-t">
            <td className="p-2">{s._id || s.Reg_no}</td>
            <td className="p-2">{s.Name}</td>
            <td className="p-2">{s.Class}</td>
            <td className="p-2">{s.Department}</td>
            <td className="p-2">{s.totalPresent}</td>
            <td className="p-2">{s.totalDays}</td>
            <td className="p-2 font-semibold">{s.percentage}%</td>
            <td className={`p-2 font-bold ${s.status==='Safe'? 'text-green-600' : s.status==='Detain' ? 'text-orange-600' : 'text-red-600'}`}>{s.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
