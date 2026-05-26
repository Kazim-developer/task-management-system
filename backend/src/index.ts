import express from "express";
import errorHandler from "./middlewares/globalErrorHandler.middleware.js";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { prisma } from "./db/prisma.js";
import cors from "cors";
import createUserRouter from "./routes/createUser.route.js";
import loginRouter from "./routes/login.route.js";
import resetPasswordRouter from "./routes/resetPassword.route.js";
import meRouter from "./routes/me.route.js";
import "./config/passport.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use("/auth", createUserRouter);
app.use("/auth", loginRouter);
app.use("/auth", resetPasswordRouter);

app.use("/auth", meRouter);

app.use(errorHandler);

app.listen(3000, () => console.log("server is running"));
