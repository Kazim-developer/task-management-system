import express from "express";
import errorHandler from "./middlewares/globalErrorHandler.middleware.js";

const app = express();

app.use(errorHandler);

app.listen(3000, () => console.log("server is running"));
