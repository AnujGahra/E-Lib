import express from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to elib apis" });
});

// global error Handler
app.use(globalErrorHandler);

export default app;
