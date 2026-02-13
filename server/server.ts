import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import ClerkWebhooks from "./controllers/clerk";


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



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
