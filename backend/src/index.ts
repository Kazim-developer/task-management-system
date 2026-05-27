import express from "express";
import errorHandler from "./middlewares/globalErrorHandler.middleware.js";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import createUserRouter from "./routes/createUser.route.js";
import loginRouter from "./routes/login.route.js";
import resetPasswordRouter from "./routes/resetPassword.route.js";
import meRouter from "./routes/me.route.js";
import logoutRouter from "./routes/logout.route.js";
import createTeamRouter from "./routes/createTeam.route.js";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";

const PgStore = connectPgSimple(session);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

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
    store: new PgStore({
      pool,
      createTableIfMissing: true,
    }),

    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

import "./config/passport.js";
import getTeamsRouter from "./routes/getTeams.route.js";
import teamDetailRouter from "./routes/getTeamDetail.route.js";
import addMemberRouter from "./routes/addMember.route.js";
import getTeamMembersRouter from "./routes/teamMembers.route.js";
import assignTaskRouter from "./routes/assignTask.route.js";

app.use("/auth", createUserRouter);
app.use("/auth", loginRouter);
app.use("/auth", resetPasswordRouter);

app.use("/auth", meRouter);
app.use("/auth", logoutRouter);

// app.use((req, res, next) => {
//   console.log("---- SESSION DEBUG ----");
//   console.log("sessionID:", req.sessionID);
//   console.log("session:", req.session);
//   console.log("passport:", (req.session as any)?.passport);
//   next();
// });

app.use(createTeamRouter);
app.use(getTeamsRouter);
app.use(teamDetailRouter);
app.use(addMemberRouter);
app.use(getTeamMembersRouter);
app.use(assignTaskRouter);

app.use(errorHandler);

app.listen(3000, () => console.log("server is running"));
