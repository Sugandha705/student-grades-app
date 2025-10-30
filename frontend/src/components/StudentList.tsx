import type { Student } from "../types/student";
// ✅ TypeScript Konzept: type für Component Props
// ✅ Konzept: Array-Typisierung
// ✅ Konzept: Optionaler Parameter
type StudentListProps = {
 students: Student[]; // Array von Students
 error?: string; // Optional: Fehlermeldung
};
// ✅ Konzept: Funktionsparameter mit Props-Type
const StudentList = ({ students, error }: StudentListProps) => {

 // ✅ Konzept: Optionale Werte prüfen
 if (error) {
 return <div className="error">Fehler: {error}</div>;
 }
 if (students.length === 0) {
 return <div className="info">Keine Studenten vorhanden</div>;
 }
 return (
 <div className="student-list">
 <h2>Studenten-Liste</h2>
 <table>
 <thead>
 <tr>
 <th>Name</th>
 <th>Note</th>
 </tr>
 </thead>
 <tbody>
 {/* ✅ Konzept: Array wird gemappt, TypeScript kennt den Typ von
student */}
{students.map((student: Student) => (
 <tr key={student._id}>
 <td>{student.name}</td>
 <td>{student.grade}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
};
export default StudentList;
