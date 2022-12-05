import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/user";
import LocationRoutes from "./routes/location";
import CategoryRoutes from "./routes/category";
import CompanySizeRoutes from "./routes/companySize";
import ExperienceRoutes from "./routes/experience";
import JobTypeRoutes from "./routes/jobType";
import QualificationRoutes from "./routes/qualification";
import TagsRoutes from "./routes/tags";
import cookieParser from "cookie-parser";
import cors from "cors";

const port = 8080;
const app = express();
dotenv.config();

app.use(cookieParser());
app.use(cors(), express.json(), express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/location", LocationRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/company-size", CompanySizeRoutes);
app.use("/api/experience", ExperienceRoutes);
app.use("/api/job-type", JobTypeRoutes);
app.use("/api/qualification", QualificationRoutes);
app.use("/api/tag", TagsRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
