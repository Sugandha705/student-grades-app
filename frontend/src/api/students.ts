import type { Student } from "../types/student";
const API_URL = "http://localhost:3000/api/students";
// ✅ TypeScript Konzept: Funktions-Typisierung mit Promise und Array
// Funktion gibt ein Promise zurück, das ein Array von Students enthält
export const fetchStudents = async (): Promise<Student[]> => {
 const response = await fetch(API_URL);

 if (!response.ok) {
 throw new Error("Fehler beim Laden der Studenten");
 }

 // ✅ Konzept: Response-Daten als Array typisieren
 const data: Student[] = await response.json();
 return data;
};
// ✅ Konzept: Funktionsparameter typisieren
// Funktion nimmt ein Student-Objekt ohne _id und gibt ein Student zurück
export const addStudent = async (student: Omit<Student, '_id' | 'createdAt'
| 'updatedAt'>): Promise<Student> => {
 const response = await fetch(API_URL, {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify(student)
 });

 if (!response.ok) {
 throw new Error("Fehler beim Hinzufügen des Studenten");
 }

 const data: Student = await response.json();
  return data;
};