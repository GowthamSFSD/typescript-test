import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";

dotenv.config({ debug: false });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/", (req, res) => {
  res.send("Hey I am Working!");
});

app.use(globalErrorHandler);

export default app;
