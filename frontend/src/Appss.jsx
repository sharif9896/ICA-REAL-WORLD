import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ReportsPage from './pages/ReportsPage'
import StudentDetail from './pages/StudentDetail'
import UploadAttendance from './pages/UploadAttendance'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/reports" element={<ReportsPage/>} />
          <Route path="/student/:reg" element={<StudentDetail/>} />
          <Route path="/upload" element={<UploadAttendance/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
