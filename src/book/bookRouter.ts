import path from "node:path";
import express from "express";
import {
  createBook,
  deleteBook,
  getSingleBook,
  listBooks,
  updateBook,
} from "./bookController";
import multer from "multer";
import authenticate from "../middlewares/authenticate";

const bookRouter = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30 MB
});

// Routes for the book API

// Create a new book
bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

// Update an existing book
bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

// Get a list of all books
bookRouter.get("/", listBooks);

// Get a single book by ID
bookRouter.get("/:bookId", getSingleBook);

// Delete a book by ID
bookRouter.delete("/:bookId", authenticate, deleteBook);

export default bookRouter;
