import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { fetchStudentDetail } from '../api/attendanceApi'
import StudentCalendar from '../components/StudentCalendar'

export default function StudentDetail(){
  const { reg } = useParams()
  const [detail, setDetail] = useState(null)

  useEffect(()=>{ if(reg) load(); },[reg])
  const load = async ()=>{ try{ const res = await fetchStudentDetail(reg); setDetail(res);}catch(e){console.error(e)} }

  if(!detail) return <div>Loading...</div>
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{detail.Name} ({detail.Reg_no})</h1>
      <p>Class: {detail.Class} · Department: {detail.Department}</p>
      <p>Present: {detail.totalPresent} / {detail.totalDays} · {detail.percentage}% · {detail.status}</p>

      <StudentCalendar events={detail.calendar} />
    </div>
  )
}
