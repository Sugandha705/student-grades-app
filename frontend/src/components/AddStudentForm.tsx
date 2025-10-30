import {useState} from "react";
import type { FormEvent, ChangeEvent } from "react";
// ✅ TypeScript Konzept: type für Component Props
// ✅ Konzept: Funktions-Typisierung
type AddStudentFormProps = {
 onStudentAdded: () => void; // Callback-Funktion ohne Rückgabewert
};
// ✅ Konzept: type für Form-Daten
type FormData = {
 name: string;
 grade: string; // String, weil Input-Felder immer Strings liefern
};
const AddStudentForm = ({ onStudentAdded }: AddStudentFormProps) => {

 // ✅ Konzept: useState mit Objekt-Typisierung
 const [formData, setFormData] = useState<FormData>({
 name: "",
 grade: ""
 });
 const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // ✅ Konzept: Event-Handler Typisierung mit ChangeEvent
 const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
 const { name, value } = e.target;
 setFormData(prev => ({
 ...prev,
 [name]: value
 }));
 };
 // ✅ Konzept: Event-Handler Typisierung mit FormEvent
 const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {

 e.preventDefault();
 setIsSubmitting(true);
 try {
 // ✅ Konzept: String zu Number konvertieren mit expliziter Typisierung
 const gradeAsNumber: number = parseFloat(formData.grade);
 const response = await fetch("http://localhost:3000/api/students", {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify({
 name: formData.name,
 grade: gradeAsNumber // Als Number senden
 })
 });
 if (response.ok) {
 // Formular zurücksetzen
 setFormData({ name: "", grade: "" });
 // Parent-Komponente informieren
 onStudentAdded();
 } else {
 alert("Fehler beim Hinzufügen des Studenten");
 }
 } catch (error: unknown) {
 // ✅ Konzept: unknown Type für Error-Handling
 if (error instanceof Error) {
 alert(`Fehler: ${error.message}`);
 } else {
 alert("Ein unbekannter Fehler ist aufgetreten");
 }
 } finally {
 setIsSubmitting(false);
 }
 };
 return (
 <div className="add-student-form">
 <h2>Neuen Student hinzufügen</h2>
 <form onSubmit={handleSubmit}>
 <div>
 <label htmlFor="name">Name:</label>
 <input
 type="text"
 id="name"
 name="name"
 value={formData.name}
 onChange={handleInputChange}
 required
 />
 </div>
 <div>
 <label htmlFor="grade">Note (1-6):</label>
 <input
 type="number"
 id="grade"
 name="grade"
 value={formData.grade}
 onChange={handleInputChange}
 min="1"
 max="6"
 step="0.1"
 required
 />
 </div>
 <button type="submit" disabled={isSubmitting}>
 {isSubmitting ? "Wird hinzugefügt..." : "Hinzufügen"}
 </button>
 </form>
 </div>
 );
};
export default AddStudentForm;