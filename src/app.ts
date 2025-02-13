import express from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

app.use(express.json());
// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to elib apis" });
});

// Routes
app.use('/api/users', userRouter);

// global error Handler
app.use(globalErrorHandler);

export default app;
