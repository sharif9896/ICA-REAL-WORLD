import React, {useState} from 'react'
import axios from 'axios'

export default function UploadAttendance(){
  const [file, setFile] = useState(null)
  const upload = async ()=>{ try{
    if(!file) return alert('Select file (CSV/Excel)')
    const form = new FormData(); form.append('file', file)
    await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/attendance/upload`, form)
    alert('Uploaded')
  }catch(e){ console.error(e); alert('Upload failed') } }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload Attendance (CSV/Excel)</h1>
      <input type="file" onChange={e=>setFile(e.target.files[0])} />
      <button onClick={upload} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
    </div>
  )
}
