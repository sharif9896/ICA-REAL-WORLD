import React from 'react'
import { exportExcel } from '../api/attendanceApi'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ExportButtons({ start, end, data }){
  const downloadExcel = async ()=>{ try{
    const res = await exportExcel(start, end)
    const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `attendance-${start}-to-${end}.xlsx`)
  }catch(e){ console.error(e); alert('Export failed') } }

  const downloadPDF = async ()=>{ try{
    const el = document.querySelector('table')
    if(!el) return alert('No table')
    const canvas = await html2canvas(el)
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF('landscape')
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    pdf.addImage(img, 'PNG', 0, 0, w, h)
    pdf.save(`attendance-${start}-to-${end}.pdf`)
  }catch(e){ console.error(e); alert('PDF export failed') } }

  return (
    <div className="flex gap-2">
      <button onClick={downloadExcel} className="px-3 py-1 bg-green-600 text-white rounded">Export Excel</button>
      <button onClick={downloadPDF} className="px-3 py-1 bg-red-600 text-white rounded">Export PDF</button>
    </div>
  )
}
