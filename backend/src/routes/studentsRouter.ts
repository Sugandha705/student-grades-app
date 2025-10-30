import express from "express";
// import { getAllStudents, createStudent } from
// "../controllers/studentsController.ts";
import { getAllStudents, createStudent } from "../controllers/studentsController";
const studentsRouter = express.Router();
studentsRouter
 .get("/", getAllStudents)
 .post("/", createStudent)
export default studentsRouter;