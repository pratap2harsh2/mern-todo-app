import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js"
import path from "path"
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use("/api/todos",todoRoutes)
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () =>{ 
    connectDB();
    console.log(`Example app listening on port ${port}!`)}
)