import "./configs/instrument.mjs"
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import ClerkWebhooks from "./controllers/clerk";
import * as Sentry from "@sentry/node"
import userRouter from "./routes/user.route";
import projectRouter from "./routes/project.routes";

const app = express();

// Middleware
app.use(cors());

app.post(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    ClerkWebhooks
);
app.use(express.json());
app.use(clerkMiddleware());

const port = process.env.PORT || 5500;

app.get("/", (req: Request, res: Response) => {
    res.send("Server is Live!");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
