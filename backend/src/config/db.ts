import mongoose from "mongoose";
const URL = process.env.MONGO_URL || "";
console.log({URL});
mongoose.connection.on('error', (error) => {
 console.log('DB after initial connection:', error);
});
const connectDB = async () => {
 try {
 await mongoose.connect(URL, {
 dbName: process.env.DATABASE
 });
 console.log('Connected to MongoDB!');
 } catch (error) {
 console.error('Connection error:', error);
 }
};
export default connectDB;