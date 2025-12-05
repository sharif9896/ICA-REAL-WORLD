import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function StudentCalendar({ events=[] }){
  const tileContent = ({ date, view }) => {
    if(view === 'month'){
      const d = date.toISOString().slice(0,10)
      const ev = events.find(e=>e.Date===d)
      if(ev) return <div className={`text-xs font-bold ${ev.Status==='Present' ? 'text-green-600' : 'text-red-600'}`}>{ev.Status}</div>
    }
    return null
  }

  return (
    <div>
      <Calendar tileContent={tileContent} />
    </div>
  )
}
