
import { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";
import type { Student, LoadingStatus } from "./types/student";
import { fetchStudents } from "./api/students";
import "./App.css";
function App() {

 // ✅ TypeScript Konzept: useState mit Array-Typisierung
 const [students, setStudents] = useState<Student[]>([]);

 // ✅ Konzept: Union Type für Status
 const [status, setStatus] = useState<LoadingStatus>('idle');

 // ✅ Konzept: Optionaler Wert
 const [error, setError] = useState<string | undefined>(undefined);
 // ✅ Konzept: Async Funktion typisieren
 const loadStudents = async (): Promise<void> => {
 setStatus('loading');
 setError(undefined);

 try {
 const data: Student[] = await fetchStudents();
 setStudents(data);
 setStatus('idle');
 } catch (err: unknown) {
 // ✅ Konzept: unknown Type prüfen
 if (err instanceof Error) {
 setError(err.message);
 } else {
 setError("Fehler beim Laden der Studenten");
 }
 setStatus('error');
 }
 };
 // Beim ersten Laden
 useEffect(() => {
 loadStudents();
 }, []);
 return (
 <div className="app">
 <h1>📚 Studenten-Notenverwaltung</h1>

 {status === 'loading' && <div className="loading">Laden...</div>}

 <AddStudentForm onStudentAdded={loadStudents} />

 <StudentList students={students} error={error} />
 </div>
  );
}
export default App;











// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
