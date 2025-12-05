import React from 'react'

export default function DateRangePicker({ value, onChange }){
  return (
    <div className="flex gap-2">
      <input type="date" className="p-2 border rounded" value={value.start} onChange={e=>onChange({...value, start: e.target.value})} />
      <input type="date" className="p-2 border rounded" value={value.end} onChange={e=>onChange({...value, end: e.target.value})} />
    </div>
  )
}
