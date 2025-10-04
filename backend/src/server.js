import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//middleware
app.use(cors({origin:"http://localhost:5173"}))

app.use(express.json());

app.use("/api/tasks", taskRoute);

connectDB().then(() => { 
  app.listen(PORT, () => {
    console.log(`server bat dau tai cong ${PORT}`);
  });
});  
  

