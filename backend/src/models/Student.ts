import { Document, Schema, model } from "mongoose";
// ✅ TypeScript Konzept: type Definition
// ✅ Konzept: string und number als primitive Typen
// ✅ Konzept: Optionaler Parameter mit ?
type StudentType = {
 name: string;
 grade: number;
 _id?: string; // Optional, weil MongoDB das automatisch generiert
};
// ✅ Konzept: Typen kombinieren mit & (Intersection)
// Document ist der Mongoose-Typ für Datenbankdokumente
// enthält Methoden wie .save() und _id
type StudentDocument = StudentType & Document;
// Mongoose Schema
const studentSchema = new Schema({
 name: {
 type: String,
 required: true
 },
 grade: {
 type: Number,
 required: true,
 min: 1,
 max: 6
 }
}, {
 timestamps: true
});
// Model exportieren
const Student = model<StudentDocument>("Student", studentSchema);
// Types exportieren für Verwendung in anderen Dateien
export { Student, StudentType, StudentDocument };