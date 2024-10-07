import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/router/userRouter.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/api", userRoutes);

mongoose
  .connect(
    "mongodb+srv://nguyenthanh0399545598:aEMmoFjOZ0XvcJkN@cluster0.43skw.mongodb.net/PracticeBE",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
