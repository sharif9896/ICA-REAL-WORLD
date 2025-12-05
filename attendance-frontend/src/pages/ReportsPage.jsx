import React, { useState } from 'react'
import AttendanceTable from '../components/AttendanceTable'
import DateRangePicker from '../components/DateRangePicker'
import { fetchDaily, fetchMonthly, fetchYearly, fetchRange } from '../api/attendanceApi'

export default function ReportsPage(){
  const [mode, setMode] = useState('range')
  const [data, setData] = useState([])

  const load = async (params) => {
    try{
    if(mode==='daily') setData(await fetchDaily(params.date))
    else if(mode==='monthly') setData(await fetchMonthly(params.month, params.year))
    else if(mode==='yearly') setData(await fetchYearly(params.year))
    else setData(await fetchRange(params.start, params.end))
    }catch(e){ console.error(e) }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="mb-4">
        <select value={mode} onChange={e=>setMode(e.target.value)} className="p-2 border rounded">
          <option value="daily">Daily</option>
          <option value="range">Date Range</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <AttendanceTable data={data} />
    </div>
  )
}
