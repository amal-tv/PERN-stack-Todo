import  express  from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);


app.listen(3000, () => {
    console.log(`Server running on`);
  });