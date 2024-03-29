import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/user";
import CategoryRoutes from "./routes/category";
import PackageRoutes from "./routes/package";
import CompanyRoutes from "./routes/company";
import StripeRoutes from "./routes/stripe";
import JobRoutes from "./routes/job";
import ApplicationRoutes from "./routes/application";
import OrderRoutes from "./routes/order";
import cookieParser from "cookie-parser";
import cors from "cors";

const port = 8081;
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
app.use("/api/category", CategoryRoutes);
app.use("/api/package", PackageRoutes);
app.use("/api/company", CompanyRoutes);
app.use("/api/job", JobRoutes);
app.use("/api/checkout", StripeRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/application", ApplicationRoutes);

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
