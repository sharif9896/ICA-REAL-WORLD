import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function ChartCard({ title, data=[] }){
  const statusCounts = data.reduce((acc, cur) => { acc[cur.status] = (acc[cur.status]||0)+1; return acc }, {})
  const statusData = Object.entries(statusCounts).map(([k,v])=>({ name:k, value:v }))

  const classCounts = data.reduce((acc,cur)=>{ acc[cur.Class] = (acc[cur.Class]||0)+(cur.totalPresent||0); return acc }, {})
  const classData = Object.entries(classCounts).map(([k,v])=>({ name:k, value:v }))

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{title}</h3>
      <div style={{height:200}}>
        {title.includes('Pie') || title.includes('Status') ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={60}>
                {statusData.map((_,i)=>(<Cell key={i}/>))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer>
            <BarChart data={classData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
