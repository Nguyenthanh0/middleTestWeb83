import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/router/userRouter.js";
import morgan from "morgan";
import authRouter from "./src/router/authRouter.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/api", userRoutes);
app.use("/api/auth", authRouter); // Sử dụng routes auth

mongoose
  .connect(
    "mongodb+srv://nguyenthanh0399545598:aEMmoFjOZ0XvcJkN@cluster0.43skw.mongodb.net/middleTest",
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
