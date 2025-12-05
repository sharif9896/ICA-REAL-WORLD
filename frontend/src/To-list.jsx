/*
React Todo App (TodoApp.jsx)

Features:
- Add / Edit / Delete tasks
- Title, Description, Priority (High/Medium/Low), Due Date
- Mark complete / toggle
- Sort by due date / priority / created date
- Search, Filters (All / Active / Completed), Priority filter
- Highlights overdue tasks in red
- Persists to localStorage
- Responsive & accessible (Tailwind CSS classes used)

How to use:
1. Create a React app (Vite or Create React App).
2. Install and configure Tailwind CSS (optional but recommended). You can also replace Tailwind classes with your own CSS.
3. Place this file as `src/TodoApp.jsx` and import it in `src/main.jsx` or `src/index.js`:
   `import TodoApp from './TodoApp';` and render `<TodoApp />`.

This component is a single-file starting point. Ask me if you want:
- Backend integration (Node/Express + MongoDB)
- User auth and per-user tasks
- Export (CSV/PDF) or reminders
*/

import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todo_app_tasks_v1';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatDateLocal(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  } catch (e) {
    return dateStr;
  }
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created'); // created, due, priority
  const [editingTask, setEditingTask] = useState(null);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load tasks', e);
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  }, [tasks]);

  function resetForm() {
    setTitle('');
    setDesc('');
    setPriority('Medium');
    setDueDate('');
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const t = {
      id: uid(),
      title: title.trim(),
      description: desc.trim(),
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [t, ...prev]);
    resetForm();
  }

  function handleDelete(id) {
    if (!confirm('Delete this task?')) return;
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function toggleComplete(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t));
  }

  function handleStartEdit(task) {
    setEditingTask(task);
    setTitle(task.title);
    setDesc(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editingTask) return;
    setTasks(prev => prev.map(t => t.id === editingTask.id ? {
      ...t,
      title: title.trim(),
      description: desc.trim(),
      priority,
      dueDate: dueDate || null,
      updatedAt: new Date().toISOString(),
    } : t));
    setEditingTask(null);
    resetForm();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = tasks.slice();
    if (filter === 'active') out = out.filter(t => !t.completed);
    if (filter === 'completed') out = out.filter(t => t.completed);
    if (priorityFilter !== 'all') out = out.filter(t => t.priority === priorityFilter);
    if (q) out = out.filter(t => (t.title + ' ' + t.description).toLowerCase().includes(q));

    if (sortBy === 'due') {
      out.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'priority') {
      const score = p => (p === 'High' ? 0 : p === 'Medium' ? 1 : 2);
      out.sort((a, b) => score(a.priority) - score(b.priority));
    } else { // created
      out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return out;
  }, [tasks, query, filter, sortBy, priorityFilter]);

  function clearAll() {
    if (!confirm('Clear ALL tasks?')) return;
    setTasks([]);
  }

  function exportJSON() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(evt) {
    const file = evt.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid format');
        // basic validation
        const mapped = parsed.map(p => ({
          id: p.id || uid(),
          title: p.title || '',
          description: p.description || '',
          priority: p.priority || 'Medium',
          dueDate: p.dueDate || null,
          completed: !!p.completed,
          createdAt: p.createdAt || new Date().toISOString(),
          updatedAt: p.updatedAt || new Date().toISOString(),
        }));
        setTasks(mapped);
      } catch (err) {
        alert('Failed to import JSON: ' + (err.message || err));
      }
    };
    reader.readAsText(file);
  }

  const overdue = id => {
    const t = tasks.find(x => x.id === id);
    if (!t || !t.dueDate || t.completed) return false;
    const due = new Date(t.dueDate);
    const now = new Date();
    // compare dates ignoring time
    return new Date(due.toDateString()) < new Date(now.toDateString());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Todo Application</h1>
          <p className="text-sm text-gray-600">Add, edit, and track your tasks. Saves locally in your browser.</p>
        </header>

        <section className="bg-white p-4 rounded-2xl shadow-md">
          <form onSubmit={editingTask ? handleSaveEdit : handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Title</label>
              <input className="mt-1 block w-full rounded-md border px-3 py-2" aria-label="Task title" value={title} onChange={e => setTitle(e.target.value)} />
              <label className="block text-sm font-medium mt-2">Description</label>
              <input className="mt-1 block w-full rounded-md border px-3 py-2" aria-label="Task description" value={desc} onChange={e => setDesc(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="rounded-md border px-2 py-2">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <label className="block text-sm font-medium">Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="rounded-md border px-2 py-2" />

              <div className="mt-3 flex gap-2">
                <button type="submit" className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:opacity-95">{editingTask ? 'Save' : 'Add Task'}</button>
                <button type="button" onClick={() => { resetForm(); setEditingTask(null); }} className="px-3 py-2 rounded-lg border">Clear</button>
              </div>
            </div>
          </form>

          <div className="mt-4 border-t pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-2 items-center">
                <input placeholder="Search tasks" value={query} onChange={e => setQuery(e.target.value)} className="rounded-md border px-3 py-2" aria-label="Search tasks" />
                <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-md border px-2 py-2">
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="rounded-md border px-2 py-2">
                  <option value="all">All priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="rounded-md border px-2 py-2">
                  <option value="created">Newest</option>
                  <option value="due">Due date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="flex gap-2 items-center">
                <label className="text-sm">Import</label>
                <input type="file" accept="application/json" onChange={importJSON} className="text-sm" />
                <button onClick={exportJSON} className="px-3 py-2 rounded-lg border">Export</button>
                <button onClick={clearAll} className="px-3 py-2 rounded-lg border text-red-600">Clear All</button>
              </div>
            </div>

            <div className="mt-4">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No tasks found at this Movement — add one above</p>
              ) : (
                <ul className="space-y-3">
                  {filtered.map(task => (
                    <li key={task.id} className={`p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between shadow-sm ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
                      <div className="flex items-start gap-3 w-full">
                        <input id={`chk-${task.id}`} type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} className="mt-1" aria-label={`Mark ${task.title} complete`} />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 justify-between">
                            <div>
                              <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority}</span>
                                {task.dueDate && (
                                  <small className={`text-xs ${overdue(task.id) ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>{formatDateLocal(task.dueDate)}</small>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">Created: {formatDateLocal(task.createdAt)}</div>
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2 text-sm">
                            <button onClick={() => handleStartEdit(task)} className="px-2 py-1 border rounded">Edit</button>
                            <button onClick={() => handleDelete(task.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-6 text-center text-sm text-gray-500">DiyaproSoft Innovative Technology Solutions</footer>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SplashScreen from "./components/SplashScreen";
// import AttendanceTable from "./components/AttendanceTable";

// function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShowSplash(false);
//     }, 5000); // 3 seconds
//     return () => clearTimeout(timeout);
//   }, []);

//   if (showSplash) {
//     return <SplashScreen />;
//   }
//   return (
//     <>
//       <ToastContainer />
//       <Home />
//     </>
//   );
// }

// export default App;

// // import {
// //   SignedIn,
// //   SignedOut,
// //   SignInButton,
// //   UserButton,
// // } from "@clerk/clerk-react";
// // import Profile from "./pages/Profile";

// // export default function App() {
// //   return (
// //     <>
// //       <header>
// //         <SignedOut>
// //           <SignInButton />
// //         </SignedOut>
// //         <SignedIn>
// //           <UserButton />
// //         </SignedIn>
// //       </header>
// //       <Profile />
// //     </>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import Home from "./pages/Home";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import SplashScreen from "./components/SplashScreen";
// // import AttendanceTable from "./components/AttendanceTable";

// // import React from "react";
// // import StudentTable from "./pages/StudentTable";

// // function App() {
// //   return (
// //     <div className="container mx-auto">
// //       <StudentTable />
// //     </div>
// //   );
// // }

// // export default App;

// // import React, { useState } from "react";

// // const App = () => {
// // const [student, setStudent] = useState({
// //   name: "",
// //   registerNumber: "",
// //   department: "",
// //   dob: "",
// //   mobile: "",
// // });

// // const handleChange = (e) => {
// //   setStudent({ ...student, [e.target.name]: e.target.value });
// // };

// // const handleSubmit = (e) => {
// //   e.preventDefault();
// //   alert("Form Submitted Successfully!");
// //   console.log(student);
// // };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 animate-fade-in"
// //       >
// //         <h2 className="text-3xl font-bold text-center text-blue-600 mb-4 animate-bounce">
// //           Student Details Form
// //         </h2>

// //         {/* Grid of input fields */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Full Name */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="text"
// //               name="name"
// //               value={student.name}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Full Name
// //             </label>
// //           </div>

// //           {/* Register Number */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="text"
// //               name="registerNumber"
// //               value={student.registerNumber}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Register Number
// //             </label>
// //           </div>

// //           {/* Department */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="text"
// //               name="department"
// //               value={student.department}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Department
// //             </label>
// //           </div>

// //           {/* Date of Birth */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="date"
// //               name="dob"
// //               value={student.dob}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Date of Birth
// //             </label>
// //           </div>

// //           {/* Mobile Number */}
// //           <div className="relative z-0 w-full group col-span-1 md:col-span-2">
// //             <input
// //               type="tel"
// //               name="mobile"
// //               value={student.mobile}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Mobile Number
// //             </label>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-300 transform hover:scale-105"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useState } from "react";

// // const App = () => {
// //   const [student, setStudent] = useState({
// //     name: "",
// //     registerNumber: "",
// //     department: "",
// //     dob: "",
// //     mobile: "",
// //   });

// //   const handleChange = (e) => {
// //     setStudent({ ...student, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     alert("Form Submitted Successfully!");
// //     console.log(student);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6 animate-fade-in"
// //       >
// //         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 animate-bounce">
// //           Student Details Form
// //         </h2>

// //         {/* Input Field Template */}
// //         {[
// //           { label: "Full Name", name: "name", type: "text" },
// //           { label: "Register Number", name: "registerNumber", type: "text" },
// //           { label: "Department", name: "department", type: "text" },
// //           { label: "Date of Birth", name: "dob", type: "date" },
// //           { label: "Mobile Number", name: "mobile", type: "tel" },
// //         ].map((field, index) => (
// //           <div className="relative z-0 w-full group" key={index}>
// //             <input
// //               type={field.type}
// //               name={field.name}
// //               value={student[field.name]}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               htmlFor={field.name}
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               {field.label}
// //             </label>
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-300 transform hover:scale-105"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default App;
