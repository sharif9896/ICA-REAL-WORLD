import React, {useEffect, useState} from 'react'
import { fetchRange } from '../api/attendanceApi'
import ChartCard from '../components/ChartCard'
import AttendanceTable from '../components/AttendanceTable'
import DateRangePicker from '../components/DateRangePicker'
import ExportButtons from '../components/ExportButtons'

export default function Dashboard(){
  const [range, setRange] = useState({start:'2025-01-01', end:'2025-01-31'})
  const [data, setData] = useState([])

  useEffect(()=>{ load(); },[range])
  const load = async ()=>{ try{ const res = await fetchRange(range.start, range.end); setData(res);}catch(e){console.error(e)} }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Dashboard</h1>

      <div className="flex gap-4 items-center mb-4">
        <DateRangePicker value={range} onChange={setRange} />
        <ExportButtons start={range.start} end={range.end} data={data} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <ChartCard title="Overall Attendance" data={data} />
        <ChartCard title="Status Distribution" data={data} />
        <ChartCard title="Class-wise" data={data} />
      </div>

      <AttendanceTable data={data} />
    </div>
  )
}
