import { Request, Response } from "express";
import { Student, StudentType } from "../models/Student";
// ✅ TypeScript Konzept: Funktions-Typisierung mit Request & Response


// GET - Alle Studenten abrufen
export const getAllStudents = async (req: Request, res: Response):
Promise<void> => {
 try {
 // ✅ Konzept: Array-Typisierung - students ist vom Typ StudentDocument[]

 const students = await Student.find();

 res.json(students);
 } catch (error: unknown) {
 // ✅ Konzept: unknown Type für Error-Handling
 // unknown ist sicherer als any - wir müssen den Typ prüfen

 if (error instanceof Error) {
 res.status(500).json({ message: error.message });
 } else {
 res.status(500).json({ message: "Ein unbekannter Fehler ist aufgetreten" });
 }
 }
};


// POST - Neuen Student erstellen
export const createStudent = async (req: Request, res: Response):
Promise<void> => {
 try {
 // ✅ Konzept: Objekt-Typisierung
 const { name, grade }: StudentType = req.body;

 // Validierung
 if (!name || !grade) {
 res.status(400).json({ message: "Name und Note sind erforderlich" });
 return;
 }

 if (grade < 1 || grade > 6) {
 res.status(400).json({ message: "Note muss zwischen 1 und 6 liegen"
});
 return;
 }

 const newStudent = new Student({ name, grade });
 const savedStudent = await newStudent.save();

 res.status(201).json(savedStudent);
 } catch (error: unknown) {
 if (error instanceof Error) {
    res.status(500).json({ message: error.message });
 } else {
 res.status(500).json({ message: "Ein unbekannter Fehler ist aufgetreten" });
 }
 }
};